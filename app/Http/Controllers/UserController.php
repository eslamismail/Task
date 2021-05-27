<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Storage;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return response()->json([
            'user' => auth()->guard('api')->user(),
        ], 200);
    }

    public function refresh()
    {
        $token = auth()->guard('api')->refresh();
        $user = auth()->guard('api')->user();
        $response = [
            'token' => $token,
            'user' => $user,
        ];

        return response($response, 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = auth()->guard('api')->login($user);
                $response = [
                    'token' => $token,
                    'message' => 'welcome back ' . $user->name,
                    'user' => $user,
                ];

                return response()->json($response, 200);
            } else {
                $response = [
                    "message" => "Password mismatch",
                ];
                return response()->json($response, 400);
            }
        }
        $response = [
            "message" => 'user does not exist',
        ];
        return response()->json($response, 400);
    }

    public function logout(Request $request)
    {
        auth()->guard('api')->logout();

        $response = [
            'message' => 'You have been successfully logged out!',
        ];
        return response($response, 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|same:password',
            'first_name' => 'required|string|min:3|max:255',
            'last_name' => 'required|string|min:3|max:255',
            'avatar' => 'mimes:png,jpeg,jpg',
        ]);

        $data = $request->only([
            'first_name',
            'last_name',
            'email',
        ]);

        $data['password'] = bcrypt($request->password);
        if ($request->has('avatar')) {
            $data['avatar_name'] = Storage::disk('uploads')->put('users', $request->avatar);
        }

        User::create($data);

        return $this->login($request);
    }
}

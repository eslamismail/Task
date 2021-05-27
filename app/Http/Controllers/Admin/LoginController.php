<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Hash;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:admins,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::where('email', $request->email)->first();
        if ($admin) {
            if (Hash::check($request->password, $admin->password)) {
                $token = auth()->guard('admin')->login($admin);
                $response = [
                    'token' => $token,
                    'message' => 'welcome back ' . $admin->name,
                    'admin' => $admin,
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
            "message" => 'Admin does not exist',
        ];
        return response()->json($response, 400);
    }

    public function user()
    {
        return response()->json([
            'admin' => auth()->guard('admin')->user(),
        ]);
    }

    public function logout(Request $request)
    {
        auth()->guard('admin')->logout();

        $response = [
            'message' => 'You have been successfully logged out!',
        ];
        return response($response, 200);
    }

    public function refresh()
    {
        $token = auth()->guard('admin')->refresh();
        $admin = auth()->guard('admin')->user();
        $response = [
            'token' => $token,
            'admin' => $admin,
        ];

        return response($response, 200);
    }
}

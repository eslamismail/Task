<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Storage;

class UserController extends Controller
{
    public function index()
    {
        $users = User::get();

        return response()->json([
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $age = (new Carbon())->subYears(18);
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'birthdate' => 'required|date|before:' . $age,
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|same:password',
            'ar.name' => 'required|string|min:3|max:255',
            'en.name' => 'required|string|min:3|max:255',
            'avatar' => 'mimes:png,jpeg,jpg',
        ]);

        $data = $request->only([
            'ar.name',
            'en.name',
            'email',
            'birthdate',
        ]);

        $data['password'] = bcrypt($request->password);

        // return $data;
        if ($request->has('avatar')) {
            $data['avatar_name'] = Storage::disk('uploads')->put('users', $request->avatar);
        }

        User::create($data);

        return response()->json([
            'message' => 'User created successfully',
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        if (Storage::disk('uploads')->exists($user->avatar_name)) {
            Storage::disk('uploads')->delete($user->avatar_name);
        }
        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user' => $user,
        ]);
    }

    public function update($id, Request $request)
    {
        $age = (new Carbon())->subYears(18);
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'password_confirmation' => 'nullable|same:password|min:6',
            'ar.name' => 'required|string|min:3|max:255',
            'en.name' => 'required|string|min:3|max:255',
            'avatar' => 'mimes:png,jpeg,jpg',
            'birthdate' => 'required|date|before:' . $age,
        ]);

        $data = $request->only([
            'ar.name',
            'en.name',
            'email',
            'birthdate',
        ]);
        $user = User::findOrFail($id);
        if (!empty($request->password)) {
            $data['password'] = bcrypt($request->password);
        }
        if ($request->has('avatar')) {
            if (Storage::disk('uploads')->exists($user->avatar_name)) {
                Storage::disk('uploads')->delete($user->avatar_name);
            }
            $data['avatar_name'] = Storage::disk('uploads')->put('users', $request->avatar);
        }

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
        ]);
    }
}

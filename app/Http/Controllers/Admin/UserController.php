<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'password_confirmation' => 'nullable|same:password|min:6',
            'first_name' => 'required|string|min:3|max:255',
            'last_name' => 'required|string|min:3|max:255',
            'avatar' => 'mimes:png,jpeg,jpg',
        ]);

        $data = $request->only([
            'first_name',
            'last_name',
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

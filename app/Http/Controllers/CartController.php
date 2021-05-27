<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $userID = auth()->guard('api')->id();
        $user = User::with('carts')->find($userID);

        return response()->json(['user' => $user], 200);
    }

    public function addCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
        $userID = auth()->guard('api')->id();
        $cart = Cart::where('user_id', $userID)->first();
        if ($cart) {
            // check for product
            $newCart = CartProduct::where([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
            ])->first();
            if ($newCart) {
                $newCart->update(['quantity' => $newCart->quantity + 1]);
            } else {
                $newCart = CartProduct::create([
                    'cart_id' => $cart->id,
                    'product_id' => $request->product_id,
                ]);
            }
        } else {
            $cart = Cart::create(['user_id' => $userID]);
            $newCart = CartProduct::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
            ]);
        }
        $newCart = CartProduct::with('product')->find($newCart->id);

        return response()->json([
            'message' => 'Product added successfully to rour cart',
            'cart' => $newCart,
        ]);
    }
}

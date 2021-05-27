<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $skip = $request->skip;
        $limit = $request->limit;
        $products = Product::paginate(10);
        return response()->json([
            'products' => $products,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(10);

        return response()->json([
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'name' => 'required|string|min:3|max:255',
            'gallary.*' => 'mimes:jpg,jpeg,png,gif',
            'image' => 'mimes:jpg,jpeg,png,gif',
        ]);
        $data = $request->only([
            'name',
            'description',
            'price',
        ]);
        if ($request->has('image')) {
            $data['image_name'] = Storage::disk('uploads')->put('products/images', $request->image);
        }

        if ($request->has('gallary')) {
            $gallary = [];
            foreach ($request->file('gallary') as $key => $image) {
                $gallary[] = Storage::disk('uploads')->put('products/gallary', $request->file('gallary')[$key]);
            }

            $data['gallary_arr'] = json_encode($gallary);
        }

        Product::create($data);

        return response()->json([
            'message' => 'Product created successfully',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json([
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'name' => 'required|string|min:3|max:255',
            'gallary.*' => 'mimes:jpg,jpeg,png,gif',
            'image' => 'mimes:jpg,jpeg,png,gif',
        ]);

        $data = $request->only([
            'name',
            'description',
            'price',
        ]);

        $product = Product::findOrFail($id);
        if ($request->has('image')) {

            if (Storage::disk('uploads')->exists($product->image_name)) {
                Storage::disk('uploads')->delete($product->image_name);
            }

            $data['image_name'] = Storage::disk('uploads')->put('products/images', $request->image);
        }

        if ($request->has('gallary')) {
            if (is_array(json_decode($product->gallary_arr))) {
                foreach (json_decode($product->gallary_arr) as $image) {
                    if (Storage::disk('uploads')->exists($image)) {
                        Storage::disk('uploads')->delete($image);
                    }
                }
            }

            $gallary = [];
            foreach ($request->file('gallary') as $key => $image) {
                $gallary[] = Storage::disk('uploads')->put('products/gallary', $request->file('gallary')[$key]);
            }

            $data['gallary_arr'] = json_encode($gallary);
        }

        $product->update($data);
        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if (Storage::disk('uploads')->exists($product->video_name)) {
            Storage::disk('uploads')->delete($product->video_name);
        }

        if (Storage::disk('uploads')->exists($product->image_name)) {
            Storage::disk('uploads')->delete($product->image_name);
        }

        if (is_array(json_decode($product->gallary_arr))) {
            foreach (json_decode($product->gallary_arr) as $image) {
                if (Storage::disk('uploads')->exists($image)) {
                    Storage::disk('uploads')->delete($image);
                }
            }
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}

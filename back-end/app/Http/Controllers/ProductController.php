<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() 
    {
        $data = Product::all();
        return $data;
    }

    public function store(Request $request)
    {
        $data = Product::create($request->all());
        return $data;
    }

    public function show($id)
    {
        $data = Product::findOrFail($id);
        return $data;
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->all());
        return $product;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete($id);
        return'{"success":"You have succesfully deleted the product."}';
    }
}

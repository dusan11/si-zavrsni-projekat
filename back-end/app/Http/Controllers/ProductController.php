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
        $respData['status']=201;
        $respData['data']=$data;
        return response()->json($respData);
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
        $respData['status']=204;
        $respData['data']=$product;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete($id);
        $respData['status']=204;
        return response()->json($respData);
    }
}

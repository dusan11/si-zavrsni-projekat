<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() 
    {
        //$data = Product::all();
        $data = Product::orderBy('id', 'DESC')->get();
        return $data;
    }

    public function store(Request $request)
    {
        $data = Product::create($request->all());
        $respData['status']=201;
        $respData['message']='Successfully created.';
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
        $respData['message']='Successfully updated.';
        $respData['data']=$product;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete($id);
        $respData['status']=204;
        $respData['message']='Successfully deleted.';
        return response()->json($respData);
    }
}

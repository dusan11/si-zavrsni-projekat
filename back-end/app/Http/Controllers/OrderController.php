<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index() 
    {
        $data = Order::with('status', 'company', 'products')->get();
        return $data;
    }

    public function show($id)
    {
        $data = Order::with('status', 'company', 'products')->findOrFail($id);
        return $data;
    }

    public function store(Request $request)
    {
        $data = Order::create($request->all());
        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['data']=$data;
        return response()->json($respData);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        $order->update($request->all());
        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['data']=$order;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete($id);
        $respData['status']=204;
        $respData['message']='Successfully deleted.';
        return response()->json($respData);
    }

    public function removeProduct($order_id, $product_id)
    {
        $order = Order::find($order_id);
        $order->products()->detach($product_id);
        $respData['status']=200;
        $respData['message']='Successfully removed the product.';
        return response()->json($respData);
    }

    public function addProduct(Request $request, $order_id, $product_id)
    {
        $order = Order::find($order_id);
        $order->products()->attach($product_id, $request->input('amount'));
        $respData['status']=200;
        $respData['message']='Successfully added the product.';
        return response()->json($respData);
    }
}

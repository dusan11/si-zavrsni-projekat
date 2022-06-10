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
        return $data;
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        $order->update($request->all());
        return $order;
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete($id);
        return'{"success":"You have succesfully deleted the order."}';
    }

    public function removeProduct($order_id, $product_id)
    {
        $order = Order::find($order_id);
        $order->products()->detach($product_id);
        return '{"success":"You have succesfully removed the order item."}';
    }

    public function addProduct(Request $request, $order_id, $product_id)
    {
        $order = Order::find($order_id);
        $order->products()->attach($product_id, $request->input('amount'));
        return '{"success":"You have succesfully added the order item."}';
    }
}

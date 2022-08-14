<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index() 
    {
        $data = Order::with('orderStatus', 'company', 'products')->orderBy('id', 'DESC')->get();
        return $data;
    }

    public function show($id)
    {
        $data = Order::with('orderStatus', 'company', 'products')->findOrFail($id);
        return $data;
    }

    public function store(Request $request)
    {
        $order = Order::insert([
            'date' => $request->date,
            'company_id' => $request->company,
            'order_status_id' => $request->orderStatus,
            'total_price' => $request->totalPrice,
            'created_at' =>  date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['order']=$order;
        return response()->json($respData);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        //$order->update($request->all());
      
        $order->update([
            'date' => $request->date,
            'company_id' => $request->companyId,
            'order_status_id' => $request->orderStatusId,
            'total_price' => $request->total_price,
            'updated_at' => date('Y-m-d H:i:s'),
            ]);

        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['data']=$order;
        return response()->json($respData);
    }

    public function updateTotalPrice(Request $request, $id)
    {
        $order = Order::find($id);
        //$order->update($request->all());
      
        $order->update([
            'total_price' => $request->total_price,
            'updated_at' => date('Y-m-d H:i:s'),
            ]);

        $respData['status']=204;
        $respData['message']='Total price successfully updated.';
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
        $order->products()->attach($product_id, ['amount' => $request->input('amount')]);
        $respData['status']=200;
        $respData['message']='Successfully added the product.';
        return response()->json($respData);
    }
}

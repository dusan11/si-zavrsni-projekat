<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderStatus;

class OrderStatusController extends Controller
{
    public function index() 
    {
        $data = OrderStatus::all();
        return $data;
    }

    public function store(Request $request)
    {
        $data = OrderStatus::create($request->all());
        return $data;
    }

    public function show($id)
    {
        $data = OrderStatus::findOrFail($id);
        return $data;
    }

    public function update(Request $request, $id)
    {
        $orderStatus = OrderStatus::find($id);
        $orderStatus->update($request->all());
        return $orderStatus;
    }

    public function destroy($id)
    {
        $orderStatus = OrderStatus::findOrFail($id);
        $orderStatus->delete($id);
        return'{"success":"You have succesfully deleted the order status."}';
    }
}

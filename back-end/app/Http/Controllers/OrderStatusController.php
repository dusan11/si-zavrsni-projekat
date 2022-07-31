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
        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['data']=$data;
        return response()->json($respData);
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
        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['data']=$orderStatus;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $orderStatus = OrderStatus::findOrFail($id);
        $orderStatus->delete($id);
        $respData['status']=204;
        $respData['message']='Successfully deleted.';
        return response()->json($respData);
    }
}

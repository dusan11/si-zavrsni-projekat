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

    
}

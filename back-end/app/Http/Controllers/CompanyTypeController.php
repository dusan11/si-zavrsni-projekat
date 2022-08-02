<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanyType;

class CompanyTypeController extends Controller
{
    public function index() 
    {
        $data = CompanyType::all();
        return $data;
    }

    public function store(Request $request)
    {
        //$data = CompanyType::create($request->all());
        $success = CompanyType::insert([
            'type' => $request->type,
        ]);

        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['success']=$success;
        return response()->json($respData);
    }

    public function show($id)
    {
        $data = CompanyType::findOrFail($id);
        return $data;
    }

    public function update(Request $request, $id)
    {
        $companyType = CompanyType::find($id);
        $companyType->update($request->all());
        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['data']=$companyType;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $companyType = CompanyType::findOrFail($id);
        $companyType->delete($id);
        $respData['status']=204;
        $respData['message']='Successfully deleted.';
        return response()->json($respData);
    }
}

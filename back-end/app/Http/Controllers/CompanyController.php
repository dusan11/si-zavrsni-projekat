<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utakmica;

class CompanyController extends Controller
{
    public function index() 
    {
        $data = Company::with('type')->get();
        return $data;
    }

    public function store(Request $request)
    {
        $data = Company::create($request->all());
        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['data']=$data;
        return response()->json($respData);
    }

    public function show($id)
    {
        $data = Company::with('type')->findOrFail($id);
        return $data;
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);
        $company->update($request->all());
        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['data']=$company;
        return response()->json($respData);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete($id);
        $respData['status']=204;
        $respData['message']='Successfully deleted.';
        return response()->json($respData);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index() 
    {
        $data = Company::with('company_type')->get();
        return $data;
    }

    public function store(Request $request)
    {
    //    $data = Company::with('company_type')->create($request->all());

        $success = Company::insert([
            'name' => $request->name,
            'adress' => $request->adress,
            'account_no' => $request->account_no,
            'email' => $request->email,
            'responsible_person' => $request->responsible_person,
            'company_type_id' => $request->company_type
        ]);

        $respData['status']=201;
        $respData['message']='Successfully created.';
        $respData['success']=$success;
        return response()->json($respData);
    }

    public function show($id)
    {
        $data = Company::with('company_type')->findOrFail($id);
        return $data;
    }

    public function update(Request $request, $id)
    {
        $company = Company::find($id);
  //    $company->update($request->all());

        $company->update([
            'name' => $request->name,
            'adress' => $request->adress,
            'account_no' => $request->account_no,
            'email' => $request->email,
            'responsible_person' => $request->responsible_person,
            'company_type_id' => $request->company_type
        ]);
        $respData['status']=204;
        $respData['message']='Successfully updated.';
        $respData['success']=$company;
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

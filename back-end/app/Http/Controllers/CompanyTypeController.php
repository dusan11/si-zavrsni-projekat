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
        $data = CompanyType::create($request->all());
        return $data;
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
        return $companyType;
    }

    public function destroy($id)
    {
        $companyType = CompanyType::findOrFail($id);
        $companyType->delete($id);
        return'{"success":"You have succesfully deleted the company type."}';
    }
}

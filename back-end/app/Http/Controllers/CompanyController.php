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
        return $data;
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
        return $company;
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete($id);
        return'{"success":"You have succesfully deleted the company."}';
    }
}

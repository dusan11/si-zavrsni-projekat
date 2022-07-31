<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CompanyType;

class Company extends Model
{
    use HasFactory;

    public $table = 'companies';

    protected $fillable = [
        'name', 'adress', 'account_no', 'email', 'responsible_person', 'company_type_id'

    ];

    public function company_type()
    {
        return $this->belongsTo(CompanyType::class);
    }
}

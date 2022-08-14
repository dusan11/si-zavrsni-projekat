<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $table = 'orders';

    protected $fillable = [
        'date', 'total_price', 'company_id', 'order_status_id'

    ];

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class);
    }
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    //relacija za many-many
    public function products()
    {
    return $this->belongsToMany(Product::class)->withPivot(['amount']);
    //return $this->belongsToMany(Product::class)->using(OrderProduct::class);
    }
}

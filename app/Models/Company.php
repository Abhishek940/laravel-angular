<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table='previous_companies';
    protected $fillable = [
        'company_name',
        'designation',
        'fromDate',
        'toDate'
    ];


    public static function addRules()
    {
        return [
            'company_name' => ['required'],
            'designation' => ['required'],
            'fromDate' => 'required|date',
            'toDate' => 'required|date|after_or_equal:fromDate',
          
        ];
    }

    public static function updateRules($id)
    {
        return [
           
            'fromDate' => 'date',
            'toDate' => 'date|after_or_equal:fromDate',
          
        ];
    }


    
  public static function messages()
     {
         return [
             'company_name.required' => 'Company Name is mandatory.',
             'designation.required' =>'Designation is Mandatory',
            
         ];
     }
}

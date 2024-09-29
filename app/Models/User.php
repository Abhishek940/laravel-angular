<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Validation\Rule;
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
	
	/**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

   public static function addRules()
    {
        return [
            'name' => ['required'],
            'fname' => ['required'],
            'mobileno' => ['required', 'numeric'],
            'email' => ['required', 'email', 'unique:users'],
           'image' => ['image', 'mimes:jpeg,jpg,png'],
           'gender' =>['required'],
           'role_id'=>['required'],
           'address' => '|required|regex:/^[a-zA-Z\s.\-]{1,500}$/'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'email' => [Rule::unique('users')
               ->where('deletedFlag', 0)->ignore($id, 'id')],
            'image' => ['image', 'mimes:jpeg,png,jpg'],
            'address' => 'regex:/^[a-zA-Z\s.\-,]{1,100}$/'

        ];
    }

    
  public static function messages()
     {
         return [
             'name.required' => ' Name is mandatory.',
             'fname.required' =>'Father Name is Mandatory',
             'mobileno.required' =>'Mobile No. is Mandatory',
             'email.required' =>'Email is Mandatory',
             'email.unique' => 'This Email is already exits.',
             'image.mimes' => 'The image must be a file of type: jpeg, jpg, png.',
             'gender.required' =>'Gender is Mandatory',
            'address.regex' => 'Address can only contain letters, spaces, dots,comma and hyphens (maximum 500 characters).',
         ];
     }
}

	
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table('users')->insert([
            [
                'name' => 'Abhishek',
                'fname' => 'sfvdd',
                'mobileno' => '9876543567',
                'email' => 'abhi@gmail.com',
                'password' => Hash::make('123456'),
                'image' => 'default.jpg',
                'gender' => 'Male',
                'address' => 'patna',
                'role_id' =>'1',
                'ipAddress' => '192.168.1.1',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Testtt',
                'fname' => 'nsbfj',
                'mobileno' => '0987654321',
                'email' => 'test@gmail.com',
                'password' => Hash::make('password'),
                'image' => 'default.jpg',
                'gender' => 'male',
                'address' => 'patna',
                'role_id'=>'2',
                'ipAddress' => '192.168.1.2',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ]);
    }
    
}

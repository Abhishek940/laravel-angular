<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
         ['role_name'=>'superAdmin'],
         ['role_name'=>'Admin'],
         ['role_name'=>'Proctor'],
         ['role_name'=>'Candidate'],
         ['role_name'=>'User']
       ]);

       
    }
}

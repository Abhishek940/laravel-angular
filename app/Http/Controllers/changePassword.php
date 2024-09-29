<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class changePassword extends Controller
{
    public function changePassword(Request $request)
    {

    $request->validate([
        'currentPassword' => 'required',
        'new_password' => 'required',
        'password_confirmation' => 'required'
    ]);
    
    $user = $request->user();

    if (!Hash::check($request->currentPassword, $user->password)) {
         return response()->json([
        'status' => 'error',
        'statusCode' => 402,
        'msg' => 'Current password does not match'
    ], 200);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    if ($user) {
        return response()->json([
            'status' => 'success',
            'statusCode' => 200,
            'msg' => 'Password successfully changed'
        ], 200);
     } else {
        $msg = 'Something went wrong while storing the data.';
        return response()->json(['msg' => $msg], 500);
    }

 
    }

}

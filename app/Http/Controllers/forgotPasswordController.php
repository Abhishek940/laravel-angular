<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Str;
use Mail;
use App\Mail\ResetPasswordMail;

class forgotPasswordController extends Controller
{
   
    public function sendResetLinkEmail(Request $request)
    {
       
        $request->validate([
            'email' => 'required|email|exists:users',
        ],
        [
            'email.exists' => 'The email address does not exist in our records.',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        $token = Str::random(40);
        $user->reset_token = $token;
         $user->save();

       // $resetLink = url('/password/reset/' . $token);
       $frontendBaseUrl = 'http://localhost:4200/';
       $resetLink = $frontendBaseUrl . 'resetPassword/' . $token;

      // dd($resetLink);
     
        Mail::to($user->email)->send(new ResetPasswordMail($resetLink));

        return response()->json(['message' => 'Reset password link sent.'], 200);
    }

      
    public function resetPassword(Request $request)
    {
      
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'token' => 'required|string',
            'password' => 'required|confirmed|min:6',
            'password_confirmation' => 'required'
        ], [
            'email.exists' => 'The email address does not exist.',
            'password.required' => 'Password is required',
            'password.min' => 'The password must be at least :min characters.',
            'password_confirmation.required' => 'Password confirmation is required',
            'password_confirmation.same' => 'The password confirmation must match the password.',
        ]);

        if ($validator->fails()) {
            return response()->json(['msg' => $validator->errors()->first()], 400);
        }
            $user = User::where('email', $request->email)
                        ->where('reset_token', $request->token)
                        ->first();

            if (!$user) {
                return response()->json(['msg' => 'Invalid or expired token.'], 400);
            }

        $data=  $user->password = bcrypt($request->password);
        $data=  $user->reset_token = null;
        $data=  $user->save();

        if ($user) {
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'msg' => 'Password reset successfully'
            ], 200);
        } else {
            $msg = 'Something went wrong while storing the data.';
            return response()->json(['msg' => $msg], 500);
        }

  }

    
  }

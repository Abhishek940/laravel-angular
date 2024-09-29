<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\log;
use Illuminate\Support\Facades\DB;
class Logincontroller extends Controller
{
   	
	public function login(Request $request)
    {
	    try {
			$validator = Validator::make($request->all(), [
				'email' => 'required',
				'password' => 'required',
			]);
	
			if ($validator->fails()) {
				return response()->json([
					'status' => 'error',
					'message' => 'Validation failed',
					'errors' => $validator->errors(),
				]);
			}
	
			$credentials = $request->only('email', 'password');
			
			if (isset($credentials['email'])) {
				$user = User::where('email', $credentials['email'])->first();
				//$user = DB::table('users')->where('email', $credentials['email'])->first();
				//$user = DB::table('assignment.users')->where('email', $credentials['email'])->first();
				//dd($user);
			}
	
			if (!$user || !Hash::check($credentials['password'], $user->password)) {
				return response()->json([
					'status' => 'error',
					'message' => 'Invalid credentials',
				], 401);
			}
			$token = JWTAuth::fromUser($user);

			$role = Role::find($user->role_id);
			//dd($role->role_name);
		
			return response()->json([
				'status' => 'success',
				'message' => 'User Login successful',
				'userData' => [
					'username' => $user->name,
					'roleId'  =>$user->role_id,
					'roleName'  => $role ? $role->role_name : null,
					'token'   => $token,
					//'expires_inHour' => Carbon::now()->addHour()->timestamp, // Expires in 1 hour
					'expires_in' => Carbon::now()->addDay()->timestamp, // Expires in 1 day
					
				],
							
			]);
		} catch (\Exception $e) {
			return response()->json([
				'status' => 'error',
				'message' => 'An error occurred during authentication',
				'error' => $e->getMessage(),
				'Line'  => $e->getLine()
			]);
		}
			
		return response()->json(['error' => 'Invalid credentials'], 401);

	 }

	public function logout(Request $request)
    {
			
		try {
		
			$token = str_replace('Bearer ', '', $request->header('Authorization')) ?: $request->input('token');

	    	if (!$token) {
				return response()->json(['error' => 'Token not Found'], 400);
			}

			JWTAuth::setToken($token)->invalidate();

			return response()->json(['success' => true, 'message' => 'Logout successful']);
		} catch (JWTException $e) {
			\Log::error("Error: " . $e->getMessage());
			return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
		}
	}

	public function refreshToken(Request $request)
  {
    try {
      //  $refreshToken = $request->input('refresh_token');
	  $refreshToken = str_replace('Bearer ', '', $request->header('Authorization')) ?: $request->input('token');
     // dd($refreshToken);
        $newToken = JWTAuth::refresh($refreshToken);
		//dd($newToken);
        $user = JWTAuth::setToken($newToken)->toUser();
		//dd($user);
         $expireIn = Carbon::now()->addHours(1)->timestamp;
       
        return response()->json([
            'status' => 'success',
            'message' => 'Token refreshed successfully',
            'userData' => [
                'username' => $user->vchUserName,
                'token' => $newToken,
                'expires_in' => $expireIn,
            ],
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to refresh token',
            'error' => $e->getMessage(),
        ], 401);
    }
			
}

   public function getUserRole(){
      
	  $responseData = [];
                    
	try {
		$queryData = DB::table("roles")->select('id','role_name');
			
	    $data = $queryData->get();

	 if (empty($data)) {
			$msg = 'No record found.';
			$success = false;
			$statusCode = 404;
		} else {
			$msg = "Data Retrieved Successfully";
			$success = true;
			$statusCode = 200;
		}
	
		$responseData = $data;
	} catch (\Throwable $t) {
		Log::error("Error", [
			'Controller' => 'LoginController',
			'Method' => 'getUserRole',
			'Error'  => $t->getMessage(),
			'Line'   => $t->getLine()
		]);
		$success = false;
		$msg = 'Something went wrong';
		$statusCode = 500;
	}
	
	return response()->json([
		"success" => $success,
		"statusCode" => $statusCode,
		"msg" => $msg,
		"data" => $responseData,
		
	], $statusCode);
	 
   }


}


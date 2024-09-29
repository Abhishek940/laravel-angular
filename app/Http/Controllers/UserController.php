<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Exception;
use Twilio\Rest\Client;
use Illuminate\Support\Facades\Redis;
use Elasticsearch\ClientBuilder;

class UserController extends Controller
{
   
    public function addUser(Request $request)
    {
        DB::beginTransaction();
        try {
           
            $validator = Validator::make($request->all(), User::addRules(), User::messages());
            if ($validator->fails()) {
                return response()->json([
                    'status' => 'ERROR',
                    'statusCode' => 422,
                    'msg' => $validator->errors()->first()
                ], 422);
            }
    
            $imagePath = '';
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = $file->getClientOriginalName();
                $storedPath = Storage::disk('public')->putFileAs('images', $file, $filename);
                $imagePath = 'storage/' . $storedPath;
            }
    
            $defaultPassword = Hash::make('123456');
            $userData = array_merge($validator->validated(), [
                'ipAddress' => $request->ip(),
                'created_at' => now()->setTimezone('Asia/Kolkata'),
                'image' => $imagePath,
                'password' => $defaultPassword
            ]);
    
         
            $user = DB::table('users')->insertGetId($userData);
            if ($request->has('dynamicRows')) {
                foreach ($request->input('dynamicRows') as $row) {
                    $validator = Validator::make($row, Company::addRules(), Company::messages());
            
                    if ($validator->fails()) {
                        return response()->json([
                            'status' => 'ERROR',
                            'statusCode' => 422,
                            'msg' => $validator->errors()->first()
                        ], 422);
                    }
                }
            }
    
           if ($request->has('dynamicRows')) {
                $dynamicRows = $request->input('dynamicRows');
                foreach ($dynamicRows as $row) {
                     DB::table('previous_companies')->insert([
                        'user_id' => $user,
                        'company_name' => $row['company_name'],
                        'designation' => $row['designation'],
                        'fromDate' => $row['fromDate'],
                        'toDate' => $row['toDate']
                    ]);
                }
            }
    
            DB::commit();
    
            return response()->json([
                'status' => 'SUCCESS',
                'statusCode' => 200,
                'msg' => 'User added successfully'
            ], 200);
        } catch (\Throwable $t) {
            DB::rollBack();
            Log::error("Error", [
                'Controller' => 'UserController',
                'Method' => 'addUser',
                'Error' => $t->getMessage(),
                'Line' => $t->getLine()
            ]);
            return response()->json([
                'status' => 'ERROR',
                'statusCode' => 500,
                'msg' => 'Something went wrong.'
            ], 500);
        }
    }
    
    public function getUserData(Request $request){

        /*   $responseData = [];
                    
            try {
                
                $queryData = DB::table("users as user")
                             ->leftJoin('roles as role', 'user.role_id', '=', 'role.id')
                              
                               /*  ->leftJoin("previous_companies as pm", function ($query) {
                                    $query->on('pm.user_id', '=', 'user.id');
                                })
                                ->select('user.id','user.name','user.fname', 'user.mobileno','user.email',
                                       'user.image', 'pm.company_name','pm.designation','pm.fromDate','pm.toDate');
             */
        /*    ->select('user.id','user.name','user.fname','user.mobileno','user.email','user.image','user.role_id'
             ,'role.role_name');
                $queryData = $queryData->where('user.deletedFlag', 0);
            
               $data = $queryData->get()->toArray();
            
                $page = request()->get('page', 1);
                $perPage = 10;
                $offset = ($page - 1) * $perPage;
                $total = count($data);
            
                 $paginationData = array_slice($data, $offset, $perPage);
            
                if (empty($paginationData)) {
                    $msg = 'No record found.';
                    $success = false;
                    $statusCode = 404;
                } else {
                    $msg = "Data Retrieved Successfully";
                    $success = true;
                    $statusCode = 200;
                }
            
                $responseData = $paginationData;
            } catch (\Throwable $t) {
                Log::error("Error", [
                    'Controller' => 'UserController',
                    'Method' => 'getUserData',
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
                "pagination" => [
                    "total" => $total,
                    "per_page" => $perPage,
                    "current_page" => $page,
                    "last_page" => ceil($total / $perPage)
                ]
            ], $statusCode);  

            */
            
            $responseData = [];
            $success = true;
            $msg = '';
            $statusCode = 200;
           // $perPage = 10;
          //  $page = $request->get('page', 1);
          //  $lastPage = 1;
            $userData=[];
            try {
                // delete redis data
              app('redis')->del('userData');
             
                if (app('redis')->exists('userData')) {
                    // If data exists
                    $userData = json_decode(app('redis')->get('userData'), true);

                 
                 // dd($userData);
                // Log::info('Redis cache', ['userData' => $userData]);
                } else {
                    // If no cached data exists, fetch from database and cache it
                    $queryData = DB::table("users as user")
                        ->leftJoin('roles as role', 'user.role_id', '=', 'role.id')
                        ->select('user.id', 'user.name', 'user.fname', 'user.mobileno', 'user.email', 'user.image', 'user.role_id', 'role.role_name')
                        ->where('user.deletedFlag', 0)
                        ->get()
                        ->toArray();
        
                    // Cache the fetched data
                    app('redis')->set('userData', json_encode($queryData));
                    
                    $userData = $queryData;
                  //  Log::info('cached in Redis', ['userData' => $userData]);
                }
        
                $page = request()->get('page', 1);
                $perPage = 10;
                $offset = ($page - 1) * $perPage;
                $paginationData = array_slice($userData, $offset, $perPage);
        
                if (empty($paginationData)) {
                    $msg = 'No record found.';
                    $success = false;
                    $statusCode = 404;
                } else {
                    $msg = "Data Retrieved Successfully";
                    $responseData = $paginationData;
                }
            } catch (\Throwable $t) {
                Log::error("Error", [
                    'Controller' => 'UserController',
                    'Method' => 'getUserData',
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
                "pagination" => [
                    "per_page" => $perPage,
                    "current_page" => $page,
                    "last_page" => ceil(count($userData) / $perPage)
                ]
            ], $statusCode);
         
    }

public function getUserDataById(Request $req)
{
    $msg = 'Data Retrieve Successfully';
    $statusCode = 200;
    $responseData = [];
    $status = "success";

    try {
        $id = $req->input("id");

        $queryData = DB::table("users as user")
                        ->leftJoin("previous_companies as pm", function ($query) {
                            $query->on('pm.user_id', '=', 'user.id');
                        })
                        ->leftjoin("roles as role",function ($query){
                            $query->on('role.id','=','user.role_id');
                        })
                        ->select('user.id','user.role_id', 'user.name', 'user.fname', 'user.mobileno', 'user.email', 'user.address', 'user.image',
                            'role.role_name','pm.company_name','pm.designation','pm.fromDate','pm.toDate','pm.id as prev_org_id');

        if (!empty($id)) {
            $queryData->where('user.id', $id);
        }

        $responseData = $queryData->get();
       // dd($responseData);

        if ($responseData->isEmpty()) {
            $msg = 'No record found.';
            $status = "SUCCESS";
        } else {
            $users = [];
            foreach ($responseData as $res) {
               // dd($res);
                $user = [
                    'id' => $res->id,
                    'name' => $res->name,
                    'fname' => $res->fname,
                    'mobileno' => $res->mobileno,
                    'email' => $res->email,
                    'address' => $res->address,
                    'image' => $res->image,
                    //'roleName'=>$res->role_name,
                    'role_id'=>$res->role_id,
                    'previousOrganization' => []
                ];

                // if ($res->company_name !== null) {
                    $previousOrganization = [
                        'id' => $res->prev_org_id,
                        'company_name' => $res->company_name,
                        'designation' => $res->designation,
                        'fromDate' => $res->fromDate,
                        'toDate' => $res->toDate
                    ];
                    $user['previousOrganization'][] = $previousOrganization;
               // }

                $exist = false;
                foreach ($users as &$existingUser) {
                    if ($existingUser['id'] == $user['id']) {
                        $exist = true;
                        $existingUser['previousOrganization'][] = $previousOrganization;
                        break;
                    }
                }

                // If the user doesn't exist,
                if (!$exist) {
                    $users[] = $user;
                }
            }
            $responseData = $users;
            $status = "SUCCESS";
        }
    } catch (\Throwable $t) {
        Log::error("Error", [
            'Controller' => 'UserController',
            'Method' => 'getUserDataById',
            'Error' => $t->getMessage(),
            'Line' => $t->getLine(),
        ]);
    }

    return response()->json([
        "status" => $status,
        "statusCode" => $statusCode,
        "msg" => $msg,
        "data" => $responseData
    ], $statusCode);
}


      public function updateUserData(Request $request)

        {
            $status = "ERROR";
            $statusCode =200;
            $msg = "Data update successful";
            DB::beginTransaction();
            try {
                $id = $request->input("id");
                $validator = \Validator::make($request->all(), User::updateRules($id), User::messages());

                if ($validator->fails()) {
                    return response()->json([
                        "status" => $status,
                        "statusCode" => 422,
                        "msg" => $validator->errors()->first(),
                    ], 422);
                }

             
                $dataArr['name'] = $request->name;
                $dataArr['fname'] = $request->fname;
                $dataArr['mobileno'] = $request->mobileno;
                $dataArr['address'] = $request->address;
                //$dataArr['role_id'] = $request->role_id;
                $dataArr['role_id'] = (int) $request->role_id;
                $dataArr['gender'] = $request->gender;
                $dataArr['updated_at'] = Carbon::now('Asia/Kolkata');

                if ($request->hasFile('image')) {
                    $file = $request->file('image');
                    $filename = $file->getClientOriginalName();
                    $storedPath = Storage::disk('public')->putFileAs('images', $file, $filename);
                    $imagePath = 'storage/' . $storedPath;
                    $dataArr['image'] = $imagePath;
                }

                 $updateUser = User::where('id', $id)->update($dataArr);

                if($updateUser && $request->has('dynamicRows') && $request->has('removedRows'))
                       if ($request->has('dynamicRows')) {
                        $dynamicRows = $request->input('dynamicRows');
                        $removedRows=explode(',', $request->input('removedRows'));
                        if (!empty($removedRows)) {
                            foreach ($removedRows as $removedId) {
                              DB::table('previous_companies')->where('id', $removedId)->where('user_id', $id)->delete();
                            }
                        }
                        
                       
                        foreach ($dynamicRows as $row) {
                            $existingRecord = DB::table('previous_companies')
                                ->where('id', $row['id'])
                                ->where('user_id', $id)
                                ->first();
                            
                            if ($existingRecord) {
                                DB::table('previous_companies')
                                    ->where('id', $row['id'])
                                    ->where('user_id', $id)
                                    ->update([
                                        'company_name' => $row['company_name'],
                                        'designation' => $row['designation'],
                                        'fromDate' => $row['fromDate'],
                                        'toDate' => $row['toDate']
                                    ]);
                            } else {
                               
                                DB::table('previous_companies')->insert([
                                    'user_id' => $id,
                                    'company_name' => $row['company_name'],
                                    'designation' => $row['designation'],
                                    'fromDate' => $row['fromDate'],
                                    'toDate' => $row['toDate']
                                ]);
                            }
                        }
                    
                     DB::commit();
                    $status = "success";
                    $statusCode = 200;
                    $msg = "User updated successfully";
                } else {
                    $statusCode = 402;
                    $msg = "Something went wrong while updating the user.";
                }
            } catch (\Throwable $t) {
                Log::error("Error", [
                    'Controller' => 'userController',
                    'Method' => 'updateUserData',
                    'Error' => $t->getMessage(),
                    'File' => $t->getFile(),
                    'Line' => $t->getLine(),
                ]);
                $statusCode = 422;
                $msg = 'Something went wrong. Please try again later.';
                DB::rollBack();
            }

            return response()->json([
                "status" => $status,
                "statusCode" => $statusCode,
                "msg" => $msg
            ], $statusCode);
                                   
        }

        public function searchUserData(Request $request)
              {
                $msg = "Data retrieval successful";
                $responseData = [];
                $status = "Success";
                $success = true;
                $statusCode = 200;
                
                 try {
                            
                    $queryData = DB::table("users as user")
                           ->leftJoin('roles as role', 'user.role_id', '=', 'role.id')
                            ->select('user.id','user.name','user.fname','user.mobileno','user.email','user.image',
                            'user.role_id','role.role_name');

                            if ($request->role) {
                                $role = $request->role;
                                $queryData->where('role_id', $role);
                            }
                       $responseData = $queryData->get();
                         if ($responseData->isEmpty()) {
                            $msg = 'No records found.';
                            $success = false;
                            $status = "SUCCESS";
                        }
                    } catch (\Throwable $t) {
                        Log::error("Error", [
                            'Controller' => 'UserController',
                            'Method' => 'searchUserData',
                            'Error'  => $t->getMessage(),
                            'Line' => $t->getLine()
                        ]);
                        $status = "ERROR";
                        $msg = 'Something went wrong.';
                        $statusCode = 422;
                    }
                          
                return response()->json([
                    "status" => $status,
                    "success" => $success,
                    "statusCode" => $statusCode,
                    "msg" => $msg,
                    "data" => $responseData,
                ], $statusCode);
                
              }

              

   /*           public function searchUserData(Request $request)
              {
                  $msg = "Data retrieval successful";
                  $responseData = [];
                  $status = "Success";
                  $success = true;
                  $statusCode = 200;
              
                  try {
                      // Initialize the Elasticsearch client
                      $client = ClientBuilder::create()->build();
              
                      // Prepare the search query
                      $params = [
                          'index' => 'users', // Your Elasticsearch index name
                          'body'  => [
                              'query' => [
                                  'bool' => [
                                      'must' => [
                                          [
                                              'match_all' => new \stdClass()
                                          ]
                                      ]
                                  ]
                              ]
                          ]
                      ];
              
                      // Apply filters based on request parameters
                      if ($request->role) {
                          $params['body']['query']['bool']['filter'][] = [
                              'term' => ['role_id' => $request->role]
                          ];
                      }
              
                      // Execute the search query
                      $response = $client->search($params);
              
                      // Process the search results
                      if (isset($response['hits']['hits']) && !empty($response['hits']['hits'])) {
                          $responseData = array_map(function ($hit) {
                              return $hit['_source'];
                          }, $response['hits']['hits']);
                      } else {
                          $msg = 'No records found.';
                          $success = false;
                          $status = "SUCCESS";
                      }
                  } catch (\Throwable $t) {
                      Log::error("Error", [
                          'Controller' => 'UserController',
                          'Method' => 'searchUserData',
                          'Error' => $t->getMessage(),
                          'Line' => $t->getLine()
                      ]);
                      $status = "ERROR";
                      $msg = 'Something went wrong.';
                      $statusCode = 422;
                  }
              
                  return response()->json([
                      "status" => $status,
                      "success" => $success,
                      "statusCode" => $statusCode,
                      "msg" => $msg,
                      "data" => $responseData,
                  ], $statusCode);
              }

*/
              public function updateUserRole(Request $request)
              {
              
                $status='Success';
               // $statusCode = 200;
                try {
                       $request->validate([
                        'userIds' => 'required|array',
                        'userIds.*.userId' => 'required|numeric',
                        'userIds.*.roleId' => 'required|numeric',
                    ]);
                    
                    $userIds = $request->input('userIds');
                   // dd($userIds);
                
                    foreach ($userIds as $userData) {
                        $userId = $userData['userId'];
                        $roleId = $userData['roleId'];
                        
                      User::where('id', $userId)->update(['role_id' => $roleId]);
                    }
                     $msg = "Roles updated successfully.";
                     $statusCode = 200;
                } catch (\Throwable $t) {
                     $status = "ERROR";
                     $msg = 'Something went wrong.';
                     $statusCode = 422;
                    Log::error("Error", [
                        'Controller' => 'UserController',
                        'Method' => 'updateUserRole',
                        'Error'  => $t->getMessage(),
                        'Line' => $t->getLine()
                    ]);
                }
                
                return response()->json([
                    'status' => $status,
                    'statusCode' => $statusCode,
                    'msg' => $msg
                ], $statusCode);
                
              }



    public function sendSMS()
    {
      
       $receiverNumber = "+91 9905609560";
       $message = "Helllooo";
  
        try {
  
            $account_sid = getenv("TWILIO_SID");
            $auth_token = getenv("TWILIO_TOKEN");
            $twilio_number = getenv("TWILIO_FROM");
  
            $client = new Client($account_sid, $auth_token);
           // dd($client);
            $client->messages->create($receiverNumber, [
                'from' => $twilio_number,
                'body' => $message]);
  
           dd('SMS Sent Successfully.');
  
        } catch (Exception $e) {
            ("Error: ". $e->getMessage());
        }
      
    }

             
           
    
}

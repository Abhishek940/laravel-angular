<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\InspectionConfigrationModel;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use DB;

class ConfigrationController extends Controller
{
    
    public function addConfiguration(Request $request)
    {
      //  dd($request->all());
        $status = "ERROR";
        $statusCode = 422;
        $msg = "something wrong pls try later";
       
        try {
           
            $validator = \Validator::make($request->all(), InspectionConfigrationModel::addRules(),
                           InspectionConfigrationModel::messages());

               if ($validator->fails()) {
                return response()->json([
                    "status" => $status,
                    "statusCode" => $statusCode,
                    "msg" => $validator->errors()->first()
                ], $statusCode);
            }

            $configration = new InspectionConfigrationModel();
            $configration->moduleName = $request->input('moduleName');
            $configration->isStatus = $request->isStatus;
            $configration->startDate = $request->startDate;
            $configration->endDate = $request->endDate;
            $configration->reason = $request->input('reason') ?? null;
            $configration->createdBy = !empty($request->input("userId")) ? ($request->input("userId")) : 0;
            $configration->createdOn = now()->setTimezone('Asia/Kolkata');
            $configration->ipAddress = $request->ip();
            

            if ($configration->save()) {
                $status = "SUCCESS";
                $statusCode = 200;
                $msg = "Configuration added successfully";
            } else {
                $msg = "Something went wrong while storing the data.";
            }
        } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'ConfigurationController',
                'Method' => 'addConfiguration',
                'Error' => $t->getMessage(),
                'Line'  => $t->getLine()
            ]);
        }

        return response()->json([
            "status" => $status,
            "statusCode" => $statusCode,
            "msg" => $msg
        ], $statusCode);
    }


         public function getconfigrationData(Request $request){

               $msg            = " Data Retrive Successfully";
                $responseData   = [];
                $status     = "Success";
                $success = true;
                $statusCode = 200;
                try {
           
             $queryData = InspectionConfigrationModel::select('InspectionConfigrationId','moduleName','isStatus',
                            'startDate','endDate',
                             \DB::raw('DATE_FORMAT(startDate, "%d-%m-%Y") as startDate'),
                            \DB::raw('DATE_FORMAT(endDate, "%d-%m-%Y") as endDate'),
                            'reason')->where('deletedFlag', 0);

                    $responseData = $queryData->get();
                   // dd($responseData);
                
                    if ($responseData->isEmpty()) {
                        $msg = 'No record found.';
                        $success = true;
                        $status = "SUCCESS";
                        }
                    } catch (\Throwable $t) {
                        Log::error("Error", [
                            'Controller' => 'ConfigrationController',
                            'Method' => 'getconfigrationData',
                            'Error'  => $t->getMessage()
                        ]);
                        $status = "ERROR";
                        $msg = 'something Went Wrong';
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


              public function searchConfigrationData(Request $request)
              {

                 $msg = "Data retrieval successful";
                $responseData = [];
                $status = "Success";
                $success = true;
                $statusCode = 200;
                
                 $validator = \Validator::make($request->all(), InspectionConfigrationModel::searchRules(),
                InspectionConfigrationModel::messages());
                
                if ($validator->fails()) {
                    $status = "ERROR";
                    $msg = $validator->errors()->first();
                    $statusCode = 422;
                } else {
                   
                    try {
                       // $startDate = Carbon::parse($request->startDate)->toDateString();
                       // $endDate = Carbon::parse($request->endDate)->toDateString();

                       $startDate = $request->startDate ? Carbon::parse($request->startDate)->toDateString() : null;
                       $endDate = $request->endDate ? Carbon::parse($request->endDate)->toDateString() : null;
                
                        $queryData = InspectionConfigrationModel::
                               where('deletedFlag', 0);

                            if ($request->isStatus) {
                                $isStatus = $request->isStatus;
                                $queryData->where('isStatus', $isStatus);
                            }

                            if ($request->startDate) {
                                $startDate = Carbon::parse($request->startDate)->toDateString();
                                $queryData->where('startDate', '>=', $startDate);
                            }
                    
                            if ($request->endDate) {
                                $endDate = Carbon::parse($request->endDate)->toDateString();
                                $queryData->where('endDate', '<=', $endDate);
                            }
                
                         $responseData = $queryData->get();
                
                        if ($responseData->isEmpty()) {
                            $msg = 'No records found.';
                            $success = false;
                            $status = "SUCCESS";
                        }
                    } catch (\Throwable $t) {
                        Log::error("Error", [
                            'Controller' => 'ConfigrationController',
                            'Method' => 'searchConfigrationData',
                            'Error'  => $t->getMessage(),
                            'Line' => $t->getLine()
                        ]);
                        $status = "ERROR";
                        $msg = 'Something went wrong.';
                        $statusCode = 422;
                    }
                }
                
                return response()->json([
                    "status" => $status,
                    "success" => $success,
                    "statusCode" => $statusCode,
                    "msg" => $msg,
                    "data" => $responseData,
                ], $statusCode);
                
              }

              
           public function deleteConfigrationData(Request $request)
                {
                                
                    $status = "ERROR";
                        try {
                          
                           $clientIp = $request->ip();
                           $id = $request->input('InspectionConfigrationId');
                           $dataArr['deletedFlag'] = 1;
                            $dataArr['updatedOn'] = Carbon::now('Asia/Kolkata');
                            $dataArr['updatedBy'] = $request->has("userId") ? Crypt::decryptString($request->input("userId")) : 0;
                            $dataArr['ipAddress'] = $clientIp;
                            $upObj = InspectionConfigrationModel::where('InspectionConfigrationId', $id)->update($dataArr);
                                if ($upObj) {
                                    $status = "SUCCESS";
                                    $statusCode = 200;
                                    $msg = "Record deleted successfully";
                                    $success = true;
                                } else {
                                    $statusCode = 402;
                                    $msg = "Something went wrong while deleting the data.";
                                    $success = false;
                                }
                        } catch (\Throwable $t) {
                            Log::error("Error", [
                                'Controller' => 'ConfigrationController',
                                'Method' => 'deleteConfigrationData',
                                'Error' => $t->getMessage(),
                                'File' => $t->getFile(),
                                'Line' => $t->getLine(),
                            ]);
                        
                            $status = "ERROR";
                            $statusCode = 402;
                            $msg = "something went Wrong pls try later";
                        }
                        
                        return response()->json([
                            "success" => $status,
                            "statusCode" => $statusCode,
                            "msg" => $msg,
                        ], $statusCode);
                    }


                    public function getConfigrationDataById(Request $req)
                    {
                
                        $msg = 'Data Retrieve Successfully';
                            $statusCode = 200;
                            $responseData = [];
                            $status = "success";

                            try {
                                $queryData = InspectionConfigrationModel::select('InspectionConfigrationId',
                                      'moduleName', 'isStatus','startDate', 'endDate', 'reason')
                                     ->where('deletedFlag', 0);

                                $id = $req->input("InspectionConfigrationId");
                                
                                if (!empty($id)) {
                                    $queryData->where('InspectionConfigrationId', $id);
                                }

                                $responseData = $queryData->get();

                                if ($responseData->isEmpty()) {
                                    $msg = 'No record found.';
                                    $status = "SUCCESS";
                                } else {
                                    $response = array();
                                    foreach ($responseData as $res) {
                                        $res['encId'] = Crypt::encryptString($res->InspectionConfigrationId);
                                        $res['moduleName'] = $res->moduleName;
                                        $res['isStatus'] = $res->isStatus;
                                        $res['startDate'] = $res->startDate;
                                        $res['endDate'] = $res->endDate;
                                        $res['reason'] = $res->reason;
                                        $res['createdOn'] = $res->createdOn;
                                        array_push($response, $res);
                                    }
                                    $responseData =  $response;
                                    $status = "SUCCESS";
                                }
                            } catch (\Throwable $t) {
                                Log::error("Error", [
                                    'Controller' => 'ConfigrationController',
                                    'Method' => 'getConfigrationDataById',
                                    'Error' => $t->getMessage(),
                                    'File' => $t->getFile(),
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
    

                    public function updateConfigrationData(Request $request)

                    {
                        
                      $status = "ERROR";
                        try{
                        $arrData = $request->all();
                         $id  = Crypt::decryptString($arrData['encId']);
                         if (!empty($request->all())) {
                           $clientIp = $request->ip();
                                                   
                            $validator = \Validator::make($request->all(), InspectionConfigrationModel::updateRules($id),
                            InspectionConfigrationModel::messages());
                                           
                             if ($validator->fails()) {
                               $errors = $validator->errors();
                                $msg = array();
                                foreach ($errors->all() as $message) {
                                    $msg = $message;
                                }
                                $statusCode = 422;
                            }

                              else {
                               $id = (int) Crypt::decryptString($request->input("encId"));
           
                               $dataArr['moduleName'] = $arrData['moduleName'];
                               $dataArr['isStatus'] = $arrData['isStatus'];
        
                               if ($arrData['isStatus'] == 1) {
                                $dataArr['startDate'] = $arrData['startDate'];
                                $dataArr['endDate'] = $arrData['endDate'];
                                $dataArr['reason'] = null;
                            } elseif (isset($arrData['reason'])) {
                                $dataArr['startDate'] = null;
                                $dataArr['endDate'] = null;
                                $dataArr['reason'] = $arrData['reason'];
                            }
                            
                               $dataArr['updatedOn']    = Carbon::now('Asia/Kolkata');
                                $dataArr['updatedBy']    = (!empty($request->input("userId"))) ? Crypt::decryptString($request->input("userId")) : 0;
                                $dataArr['ipAddress']  = $clientIp;
                                $update = InspectionConfigrationModel::where('InspectionConfigrationId',$id)->update($dataArr);

                               if ($update) {
                                    $status = "SUCCESS";
                                    $statusCode = 200;
                                    $msg = "configration updated successfully";
                                } else {
                                    $statusCode = 402;
                                    $msg = "Something went wrong while storing the data.";
                                }
                            }
                        } else {
                            $statusCode = 422;
                            $msg = "Something went wrong, Please try later.";
                        }
                    }
                    catch (\Throwable $t) {
                        Log::error("Error", [
                            'Controller' => 'ConfigrationController',
                            'Method'     => 'updateConfigration',
                            'Error'      => $t->getMessage(),
                            'File'      => $t->getFile(),
                            'Line'     => $t->getLine(),
                        ]);
                        $status = "ERROR";
                        $statusCode = 422;
                        $msg = 'something went wrong pls try later';
                    }
                    DB::disconnect();
                        return response()->json([
                            "status" => $status,
                            "statusCode" => $statusCode,
                            "msg" => $msg
                        ], $statusCode);
      
     }


            

}



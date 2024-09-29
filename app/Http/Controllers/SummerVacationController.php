<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\SummerVacationModel;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\InspectionConfigrationModel;
use Illuminate\Pagination\Paginator;
class SummerVacationController extends Controller
{
   	
          public function addSummerVacation(Request $request)
                {
                  
                    $validator = Validator::make($request->all(), SummerVacationModel::addRules(), SummerVacationModel::messages());
                
                      if ($validator->fails()) {
                        return response()->json([
                            'status' => 'ERROR',
                            'statusCode' => 422,
                            'msg' => $validator->errors()->first()
                        ], 422);
                    }
                
                    $validatedData = $validator->validated();
                
                    try {
                     
                        $insertData = array_merge($validatedData, [
                            'createdBy' => $request->input("userId", 0),
                            'createdOn' => now()->setTimezone('Asia/Kolkata'),
                            'ipAddress' => $request->ip(),
                        ]);
                
                       $data = DB::table('summerVacationSchoolInspection')->insert($insertData);
                                     
                        if ($data) {
                            return response()->json([
                                'status' => 'SUCCESS',
                                'statusCode' => 200,
                                'msg' => 'Summer Vacation added successfully'
                            ], 200);
                        } else {
                            $msg = 'Something went wrong while storing the data.';
                        }
                    } catch (\Throwable $t) {
                      
                        Log::error("Error", [
                            'Controller' => 'SummerVacationController',
                            'Method' => 'addSummerVacation',
                            'Error' => $t->getMessage(),
                            'Line' => $t->getLine()
                        ]);
                        $msg = 'Something went wrong.';
                    }
                
                  return response()->json([
                        'status' => 'ERROR',
                        'statusCode' => 500,
                        'msg' => $msg
                    ], 500);
                }
                    


    public function getsummerVacationData(Request $request){

           
            $responseData = [];
            $status = "success";
            
            try {
                $queryData = DB::table("esk_school.summerVacationSchoolInspection as SI")
                                ->leftJoin("esk_school.school as SC", function ($query) {
                                    $query->on('SI.schoolId', '=', 'SC.schoolId');
                                })
                                ->select('SC.schoolId','SC.schoolName', 'SC.schoolUdiseCode',
                                        'SI.inspectionDate','SI.inspectionId','SI.inspectionTime',
                                        'SI.inspectorName','SI.designation', 'SI.mobile');
            
                $queryData = $queryData->where('SI.deletedFlag', 0);
            
               $data = $queryData->orderBy('SI.inspectionId', 'desc')->get()->toArray();
            
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
                    $msg = "Summer Vacation Data Retrieved Successfully";
                    $success = true;
                    $statusCode = 200;
                }
            
                $responseData = $paginationData;
            } catch (\Throwable $t) {
                Log::error("Error", [
                    'Controller' => 'SummerVacationController',
                    'Method' => 'getsummerVacationData',
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
         }

             public function getSummerVacationDataById(Request $req) {
               
                $msg = 'Data retrieved successfully';
                $statusCode = 200;
                $responseData = [];
                $status = "success";
                try {
                    $queryData = DB::table("esk_school.summerVacationSchoolInspection as SI")
                                ->Join("esk_school.school as SC", 'SI.schoolId', '=', 'SC.schoolId')
                                ->Join("esk_master.blocks as block", 'block.blockId', '=', 'SC.blockId')->where('block.deletedFlag', 0)
                                ->select('SC.districtId', 'SC.blockId', 'SC.schoolId', 'block.districtName', 'block.blockName',
                                    'SC.schoolName', 'SC.schoolUdiseCode', 'SI.inspectionDate', 'SI.inspectionId',
                                    'SI.inspectionTime', 'SI.inspectorName','SI.teacherPosted','SI.teacherPresent','SI.unreportedLeave',
                                    'SI.teacherPosted','SI.teacherPosted','SI.annualExamClass5PercentageStudent','SI.annualExamClass5PresentStudent',
                                    'SI.annualExamClass5AbsentStudent','SI.annualExamClass8PercentageStudent','SI.annualExamClass8PresentStudent',
                                    'SI.annualExamClass8AbsentStudent','SI.missionDakshClass3IdentifiedChildren','SI.missionDakshClass3PresentChildren',
                                    'SI.missionDakshClass3PercenatgePresent','SI.mdmConducted','SI.waterFacility','SI.waterFacilityReason','SI.houseKeepingFacility'
                                    ,'SI.missionDakshClass4IdentifiedChildren','SI.missionDakshClass4PresentChildren',
                                    'SI.missionDakshClass4PercenatgePresent',
                                    'SI.missionDakshClass5IdentifiedChildren','SI.missionDakshClass5PresentChildren',
                                    'SI.missionDakshClass5PercenatgePresent',
                                    'SI.missionDakshClass6IdentifiedChildren','SI.missionDakshClass6PresentChildren',
                                    'SI.missionDakshClass6PercenatgePresent',
                                    'SI.missionDakshClass7IdentifiedChildren','SI.missionDakshClass7PresentChildren',
                                    'SI.missionDakshClass7PercenatgePresent',
                                    'SI.missionDakshClass8IdentifiedChildren','SI.missionDakshClass8PresentChildren',
                                    'SI.missionDakshClass8PercenatgePresent',

                                    'SI.houseKeepingFacilityReason','SI.toiletFacilityStatus','SI.isYesToiletFacilityStatus','SI.isYesToiletFacilityStatusReason',
                                    'SI.isNightWatchmanAvail','SI.isNightWatchmanAvailReason','SI.isIctLabHeld',

                                    'SI.designation', 'SI.mobile');
                
                
                     $id = (int) $req->input("inspectionId");

                     if (!empty($id)) {
                        $queryData->where('SI.inspectionId', $id);
                    }
                   $responseData = $queryData->first();
                // dd($responseData);
                    if ($responseData->isEmpty()) {
                        $msg = 'No record found.';
                        $status = "success";
                    } else {
                        $response = array();
                        foreach ($responseData as $res) {
                            $res->inspectionId = $res->inspectionId;
                            $res->schoolName = $res->schoolName;
                            $res->inspectionDate = $res->inspectionDate;
                            $res->inspectionTime = $res->inspectionTime;
                            $res->inspectorName = $res->inspectorName;
                            $res->designation = $res->designation;
                            $res->createdOn = $res->createdOn;
                            $response[] = $res;
                        }
                        $responseData = $response;
                        $status = "success";
                    }
                } catch (\Throwable $t) {
                    Log::error("Error", [
                        'Controller' => 'SummerController',
                        'Method' => 'getSummerDataById',
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


           public function updateSummerVacationData(Request $request)
                    {
                   
                    $requestData = json_decode($request->getContent(), true);
                    $excludeFields = ['district', 'block'];

                    $requestData = collect($requestData)->except(['district','block','districtId', 'blockId','totalFailedStudent',
                    'totalPresentStudent','totalPercentStudent','totalidntifiedStudent','totalmarkedStudent','totalpercentStudent',
                    'failedStudentIX','totalfailedStudents','totalPresentStudents','totalPercentStudents','PresentStudentIX','failedStudentXI',
                    'PresentStudentXI'])->toArray();
                   // dd($requestData);
                     $id = (int) $requestData['inspectionId'];
                    // dd($id);
                     
                  $validator = Validator::make($request->all(), SummerVacationModel::updateRules($id), SummerVacationModel::messages());

                 if ($validator->fails()) {
                     return response()->json([
                         'status' => 'ERROR',
                         'statusCode' => 422,
                         'msg' => $validator->errors()->first()
                     ], 422);
                 }

                    try {
                    
                       $updateData = array_merge($requestData, [
                            'updatedBy' => $request->input("userId", 0),
                            'updatedOn' => now()->setTimezone('Asia/Kolkata'),
                            'ipAddress' => $request->ip(),
                        ]);
                    
                       $updated = DB::table('esk_school.summerVacationSchoolInspection')
                            ->where('inspectionId', $id)
                            ->update($updateData);
                    
                        if ($updated) {
                            return response()->json([
                                'status' => 'SUCCESS',
                                'statusCode' => 200,
                                'msg' => 'Summer Vacation updated successfully'
                            ], 200);
                        } else {
                            $msg = 'No records were updated.';
                        }
                    } catch (\Throwable $t) {
                        Log::error("Error", [
                            'Controller' => 'SummerVacationController',
                            'Method' => 'updateSummerVacation',
                            'Error' => $t->getMessage(),
                            'Line' => $t->getLine()
                        ]);
                    
                        $msg = 'Something went wrong.';
                    }
                    
                    return response()->json([
                        'status' => 'ERROR',
                        'statusCode' => 500,
                        'msg' => $msg
                    ], 500);
                    
                    
                    }

              public function deleteSummerVacationData(Request $request)
                {
                                
                    $status = "ERROR";
                        try {

                         
                           $clientIp = $request->ip();
                           $id = $request->input('inspectionId');
                            $dataArr['deletedFlag'] = 1;
                            $dataArr['updatedOn'] = Carbon::now('Asia/Kolkata');
                            $dataArr['updatedBy'] = $request->has("userId") ? ($request->input("userId")) : 0;
                            $dataArr['ipAddress'] = $clientIp;
                           $updateData = DB::table('esk_school.summerVacationSchoolInspection')->where('inspectionId', $id)->update($dataArr);
                                if ($updateData) {
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
                                'Controller' => 'SummerVacationController',
                                'Method' => 'deleteSummerVacationData',
                                'Error' => $t->getMessage(),
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
    
   
                    public function getSummerVacationConfigrationData(Request $request){

                         $msg         = " Data Retrive Successfully";
                         $responseData   = [];
                         $status     = "Success";
                         $success = true;
                         $statusCode = 200;
                         try {
                    
                      $queryData = InspectionConfigrationModel::select('InspectionConfigrationId','moduleName','isStatus',
                                    // 'startDate','endDate',
                                      \DB::raw('DATE_FORMAT(startDate, "%d-%m-%Y") as startDate'),
                                     \DB::raw('DATE_FORMAT(endDate, "%d-%m-%Y") as endDate'),
                                     'reason')->where('moduleName','Summer Vacation Inspection')->where('deletedFlag', 0);
         
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
         
               
   
}
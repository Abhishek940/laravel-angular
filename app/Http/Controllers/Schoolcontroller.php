<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class Schoolcontroller extends Controller
{
    
    public function getSchoolList(Request $req){
        $msg = 'SchoolList Retrive Successfully';
        $statusCode = 200;
        $responseData = [];
        $status = "SUCCESS";
        try {
            $queryData = DB::table("esk_school.school as schl")
                          ->select('schl.schoolId', 'schl.schoolName', 'schl.schoolUdiseCode', 
                          'schl.schoolCategory', 'sklcat.schlCatName', 'schl.isPrivateSchool', 'schl.management')
                         ->leftJoin("esk_school.schoolcategories as sklcat", 'schl.schoolCategory', '=', 'sklcat.code');

               //s dd($queryData);
            if (!empty($req->input("blockId"))) {
                $queryData->where('schl.blockId', $req->input("blockId"));
            }
                      
            $responseData = $queryData->where('schl.activationFlag', 0)->where('schl.deletedflag', 0)->get();

           
            if ($responseData->isEmpty()) {
                $msg = 'No record found.';
                $status = "SUCCESS";
            }
        } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'SchoolController',
                'Method'     => 'getSchoolList',
                'Error'      => $t->getMessage()
            ]);
            DB::disconnect();
            $status = "ERROR";
            $statusCode = config('constant.EXCEPTION_CODE');
            $msg = config('constant.EXCEPTION_MESSAGE');
        }
        DB::disconnect();
        return response()->json([
            "status" => $status,
            "statusCode" => $statusCode,
            "msg" => $msg,
            "data" => $responseData
        ], $statusCode);

    }
}

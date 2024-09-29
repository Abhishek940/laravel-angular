<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\DistrictModel;
class DistrictController extends Controller
{
    public function getDistritData(Request $req)
    {
       // dd($req->all());
        $msg            = "District Data Retrive Successfully";
        $responseData   = [];
         $status     = "Success";
        $success = true;
        $statusCode = 200;
        try {
           
             $queryData = DistrictModel::select('districtId', 'districtName', 'districtcode')->where('deletedFlag', 0);
             $responseData = $queryData->orderBy('districtName', 'ASC')->get();
           
            if ($responseData->isEmpty()) {
                $msg = 'No record found.';
                $success = true;
                $status = "SUCCESS";
            }
        } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'DistrictController',
                'Method' => 'viewDistrict',
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

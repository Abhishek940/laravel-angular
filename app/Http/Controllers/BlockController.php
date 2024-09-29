<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\BlockModel;
use App\Models\DistrictModel;
class BlockController extends Controller
{
    
    public function getBlockData(Request $req){

        $msg        ="Block Data Retrive Successfully";
        $statusCode = '200';
        $responseData   = [];
        $totalRecord = 0;
        $status     = "success";
        $success = true;
        try {
          
             $queryData = BlockModel::select('blockId', 'districtId', 'blockName', 'blockCode')
                         ->where('deletedflag', 0);

              if (!empty($req->input("districtId"))) {
                 $queryData->where('districtId', ($req->input("districtId")));
            }

            $totalRecord = $queryData->count();
          
            $responseData   = $queryData->orderBy('blockName', 'ASC')->get();
               if ($responseData->isEmpty()) {
                $msg = 'No record found.';
                $success = true;
                $status = "SUCCESS";
            }
         } catch (\Throwable $t) {
            Log::error("Error", [
                'Controller' => 'BlockController',
                'Method' => 'getBlock',
                'Error'  => $t->getMessage(),
                'Line'   => $t->getLine()
            ]);
            $status     = "ERROR";
            $msg        = 'something went wrong';
            $statusCode = 422;
        }
        return response()->json([
            "status"        => $status,
            "statusCode"    => $statusCode,
            "msg"           => $msg,
            "data"          => $responseData,
            "totalRecord"   => $totalRecord
        ], $statusCode);
    }
}

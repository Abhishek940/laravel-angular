<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\controllers\ConfigrationController;
use App\Http\controllers\DistrictController;
use App\Http\controllers\BlockController;
use App\Http\controllers\SchoolController;
use App\Http\controllers\SummerVacationController;
use App\Http\controllers\UserController;
use App\Http\controllers\forgotPasswordController;
use App\Http\controllers\changePassword;
use App\Http\controllers\CategoryController;
use Illuminate\Support\Facades\Redis;
use App\Http\Controllers\WebexController;
use App\Http\controllers\MeetingController;
use App\Http\middleware\WebexAuthenticated;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

$router->post('/forgotPass', [ForgotPasswordController::class, 'sendResetLinkEmail']);
$router->post('/password/reset', [ForgotPasswordController::class, 'resetPassword']);



Route::middleware('jwt.auth')->group(function () {
 
 Route::post('/addconfigration',[ConfigrationController::class,'addConfiguration']);
 Route::post('/getconfigrationData',[ConfigrationController::class,'getconfigrationData']);
 Route::post('/getConfigrationDataById',[ConfigrationController::class,'getConfigrationDataById']);
 Route::post('/updateConfigrationData',[ConfigrationController::class,'updateConfigrationData']);
 Route::post('/deleteConfigrationData',[ConfigrationController::class,'deleteConfigrationData']);
 Route::post('/searchConfigrationData',[ConfigrationController::class,'searchConfigrationData']);

Route::post('/getDistritData',[DistrictController::class,'getDistritData']);
Route::post('/getBlockData',[BlockController::class,'getBlockData']);
Route::post('/getSchoolList',[SchoolController::class,'getSchoolList']);
Route::post('/addsummerVacation',[SummerVacationController::class,'addsummerVacation']);
Route::post('/getsummerVacationData',[SummerVacationController::class,'getsummerVacationData']);
Route::post('/deleteSummerVacationData',[SummerVacationController::class,'deleteSummerVacationData']);
Route::post('/getSummerVacationDataById',[SummerVacationController::class,'getSummerVacationDataById']);
Route::post('/updateSummerVacationData',[SummerVacationController::class,'updateSummerVacationData']);

Route::post('/getSummerVacationConfigrationData',[SummerVacationController::class,'getSummerVacationConfigrationData']);

Route::post('/AddUser',[UserController::class,'addUser']);
Route::post('/getuserData',[UserController::class,'getUserData']);
Route::post('/getUserDataById',[UserController::class,'getUserDataById']);
Route::post('/updateUserData',[UserController::class,'updateUserData']);

Route::post('/getUserRole',[LoginController::class,'getUserRole']);
Route::post('/changePassword',[changePassword::class,'changePassword']);
Route::post('/searchRoleData',[UserController::class,'searchUserData']);
Route::post('/updateUserRole',[UserController::class,'updateUserRole']);

Route::post('/addCategory',[CategoryController::class,'store']);
Route::post('/viewCategory',[CategoryController::class,'index']);

Route::post('/refreshToken', [LoginController::class, 'refreshToken']);

});

Route::post('/sendSMS', [UserController::class, 'sendSMS']);


// ------webex api--------------------------------------


    Route::get('/webex/authorize', [WebexController::class, 'redirectToWebexAuthorization']);
    Route::get('/webex/callback', [WebexController::class, 'handleWebexCallback']);
    Route::post('/create/meeting', [WebexController::class, 'createMeeting']);
    //Route::get('/meeting/participant', [WebexController::class, 'meetingParticipants']);

    Route::get('/getmeetingList', [WebexController::class, 'getMeetingList']);

    Route::get('/meeting/participants/{meetingId}', [WebexController::class,'getMeetingParticipants']);


    Route::post('/webex/refresh-token', [WebexController::class, 'refreshToken']);

    



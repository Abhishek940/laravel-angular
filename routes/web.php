<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebexController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
}); */

Route::get('/webex', function () {
    return view('webex');
});


// Route::get('/webex/redirect', [WebexController::class, 'redirectToWebexAuthorization']);
//Route::get('/webex/callback', [WebexController::class, 'handleWebexCallback']);
//Route::post('/create/meeting', [WebexController::class, 'createMeeting']); */


Route::get('/webex/authorize', [WebexController::class, 'redirectToWebexAuthorization']);
Route::get('/webex/callback', [WebexController::class, 'handleWebexCallback']);
Route::post('/create/meeting', [WebexController::class, 'createMeeting']);
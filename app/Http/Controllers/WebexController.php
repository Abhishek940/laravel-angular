<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Meeting;
use Carbon\Carbon;
use DateTime;
use App\Models\Token;
class WebexController extends Controller
{
    public function redirectToWebexAuthorization()
    {
       $clientId = env('WEBEX_CLIENT_ID');
       $redirectUri = env('WEBEX_REDIRECT_URI');
     //  $authorizationUrl ='https://webexapis.com/v1/authorize?client_id=C08a517480e3620443bfe2bf0c1bda6c7f50d0f162ad2593b2234f1f9b1e0518e&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fwebex%2Fcallback&scope=spark-admin%3Abroadworks_subscribers_write%20meeting%3Aadmin_participants_read%20spark%3Apeople_write%20spark-admin%3Awholesale_customers_write%20spark-admin%3Aworkspace_metrics_read%20spark-admin%3Awholesale_billing_reports_read%20spark-admin%3Atelephony_pstn_write%20spark%3Aplaces_read%20spark-admin%3Avideo_mesh_api_webhook_write%20meeting%3Aadmin_config_write%20spark-admin%3Arecordings_read%20spark-compliance%3Amessages_read%20spark-admin%3Aworkspaces_write%20spark-compliance%3Ameetings_write%20spark-admin%3Alocations_write%20meeting%3Aadmin_schedule_write%20identity%3Aplaceonetimepassword_create%20spark-admin%3Aorganizations_write%20guest-meeting%3Arw%20spark-admin%3Atelephony_pstn_read%20spark%3Adevices_write%20spark-admin%3Awholesale_sub_partners_write%20spark-admin%3Abroadworks_billing_reports_write%20spark-admin%3Acall_qualities_read%20spark%3Aapplications_token%20spark%3Akms%20spark%3Awebrtc_calling%20spark-admin%3Awholesale_sub_partners_read%20application%3Awebhooks_write%20spark-admin%3Awholesale_subscribers_read%20meeting%3Aadmin_config_read%20spark%3Atelephony_config_write%20meeting%3Aparticipants_read%20Identity%3Acontact%20spark-admin%3Awholesale_billing_reports_write%20spark-admin%3Avideo_mesh_api_read%20spark-admin%3Aorganizations_read%20spark-compliance%3Awebhooks_write%20meeting%3Aschedules_write%20spark-compliance%3Ateam_memberships_read%20spark-admin%3Avideo_mesh_api_write%20spark-admin%3Arecordings_write%20identity%3Aorganizations_read%20identity%3Aorganizations_rw%20spark-admin%3Adevices_read%20spark-admin%3Atelephony_config_write%20spark%3Arecordings_write%20spark-admin%3Abroadworks_enterprises_read%20spark%3Acalls_read%20meeting%3Arecordings_write%20spark%3Adevices_read%20spark-admin%3Aresource_group_memberships_read%20spark-compliance%3Aevents_read%20identity%3Apeople_rw%20spark-admin%3Aresource_group_memberships_write%20application%3Awebhooks_read%20spark-admin%3Ahybrid_connectors_read%20spark-compliance%3Ateams_read%20spark-admin%3Aplaces_write%20spark-admin%3Alicenses_read%20spark%3Aplaces_write%20meeting%3Aadmin_preferences_write%20spark%3Aall%20meeting%3Aadmin_preferences_read%20analytics%3Aread_all%20spark-admin%3Apeople_write%20spark%3Aorganizations_read%20spark-admin%3Aplaces_read%20spark-compliance%3Ateam_memberships_write%20identity%3Agroups_read%20identity%3Atokens_read%20spark-compliance%3Arecordings_read%20spark-admin%3Adevices_write%20spark%3Acalls_write%20Identity%3Aone_time_password%20spark-admin%3Aworkspace_locations_read%20spark-compliance%3Arecordings_write%20spark%3Axapi_commands%20spark-compliance%3Awebhooks_read%20spark-compliance%3Amessages_write%20spark%3Axsi%20spark-admin%3Awholesale_customers_read%20meeting%3Aparticipants_write%20meeting%3Aadmin_transcripts_read%20spark-admin%3Apeople_read%20spark-compliance%3Amemberships_read%20spark-admin%3Aresource_groups_read%20meeting%3Arecordings_read%20spark-admin%3Alocations_read%20meeting%3Apreferences_write%20meeting%3Aadmin_recordings_read%20meeting%3Atranscripts_read%20identity%3Atokens_write%20spark%3Axapi_statuses%20spark-admin%3Awholesale_subscribers_write%20spark-admin%3Acalling_cdr_read%20spark%3Arecordings_read%20meeting%3Acontrols_read%20spark-admin%3Ahybrid_clusters_read%20spark-admin%3Aworkspace_locations_write%20spark-admin%3Atelephony_config_read%20spark-admin%3Abroadworks_billing_reports_read%20meeting%3Aadmin_schedule_read%20spark-admin%3Abroadworks_enterprises_write%20meeting%3Aschedules_read%20spark-compliance%3Amemberships_write%20spark-admin%3Aroles_read%20meeting%3Apreferences_read%20spark-compliance%3Ameetings_read%20identity%3Apeople_read%20spark-admin%3Aworkspaces_read%20spark%3Atelephony_config_read%20spark-compliance%3Arooms_read%20spark-admin%3Abroadworks_subscribers_read%20identity%3Agroups_rw%20meeting%3Acontrols_write%20meeting%3Aadmin_recordings_write%20audit%3Aevents_read%20spark-compliance%3Arooms_write&state=set_state_here';

     $authorizationUrl ='https://webexapis.com/v1/authorize?client_id=Cbaf1f293d50d174343ad1e298cbd7e0b21dd9288d6f3d23c5eda14f6364ff188&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fwebex%2Fcallback&scope=Identity%3Acontact%20Identity%3Aone_time_password%20analytics%3Aread_all%20application%3Awebhooks_read%20application%3Awebhooks_write%20audit%3Aevents_read%20guest-meeting%3Arw%20identity%3Agroups_read%20identity%3Agroups_rw%20identity%3Aorganizations_read%20identity%3Aorganizations_rw%20identity%3Apeople_read%20identity%3Apeople_rw%20identity%3Aplaceonetimepassword_create%20identity%3Atokens_read%20identity%3Atokens_write%20meeting%3Aadmin_config_read%20meeting%3Aadmin_config_write%20meeting%3Aadmin_participants_read%20meeting%3Aadmin_preferences_read%20meeting%3Aadmin_preferences_write%20meeting%3Aadmin_recordings_read%20meeting%3Aadmin_recordings_write%20meeting%3Aadmin_schedule_read%20meeting%3Aadmin_schedule_write%20meeting%3Aadmin_transcripts_read%20meeting%3Acontrols_read%20meeting%3Acontrols_write%20meeting%3Aparticipants_read%20meeting%3Aparticipants_write%20meeting%3Apreferences_read%20meeting%3Apreferences_write%20meeting%3Arecordings_read%20meeting%3Arecordings_write%20meeting%3Aschedules_read%20meeting%3Aschedules_write%20meeting%3Atranscripts_read%20spark-admin%3Abroadworks_billing_reports_read%20spark-admin%3Abroadworks_billing_reports_write%20spark-admin%3Abroadworks_enterprises_read%20spark-admin%3Abroadworks_enterprises_write%20spark-admin%3Abroadworks_subscribers_read%20spark-admin%3Abroadworks_subscribers_write%20spark-admin%3Acall_qualities_read%20spark-admin%3Acalling_cdr_read%20spark-admin%3Adevices_read%20spark-admin%3Adevices_write%20spark-admin%3Ahybrid_clusters_read%20spark-admin%3Ahybrid_connectors_read%20spark-admin%3Alicenses_read%20spark-admin%3Alocations_read%20spark-admin%3Alocations_write%20spark-admin%3Aorganizations_read%20spark-admin%3Aorganizations_write%20spark-admin%3Apeople_read%20spark-admin%3Apeople_write%20spark-admin%3Aplaces_read%20spark-admin%3Aplaces_write%20spark-admin%3Arecordings_read%20spark-admin%3Arecordings_write%20spark-admin%3Aresource_group_memberships_read%20spark-admin%3Aresource_group_memberships_write%20spark-admin%3Aresource_groups_read%20spark-admin%3Aroles_read%20spark-admin%3Atelephony_config_read%20spark-admin%3Atelephony_config_write%20spark-admin%3Atelephony_pstn_read%20spark-admin%3Atelephony_pstn_write%20spark-admin%3Avideo_mesh_api_read%20spark-admin%3Avideo_mesh_api_webhook_write%20spark-admin%3Avideo_mesh_api_write%20spark-admin%3Awholesale_billing_reports_read%20spark-admin%3Awholesale_billing_reports_write%20spark-admin%3Awholesale_customers_read%20spark-admin%3Awholesale_customers_write%20spark-admin%3Awholesale_sub_partners_read%20spark-admin%3Awholesale_sub_partners_write%20spark-admin%3Awholesale_subscribers_read%20spark-admin%3Awholesale_subscribers_write%20spark-admin%3Aworkspace_locations_read%20spark-admin%3Aworkspace_locations_write%20spark-admin%3Aworkspace_metrics_read%20spark-admin%3Aworkspaces_read%20spark-admin%3Aworkspaces_write%20spark-compliance%3Aevents_read%20spark-compliance%3Ameetings_read%20spark-compliance%3Ameetings_write%20spark-compliance%3Amemberships_read%20spark-compliance%3Amemberships_write%20spark-compliance%3Amessages_read%20spark-compliance%3Amessages_write%20spark-compliance%3Arecordings_read%20spark-compliance%3Arecordings_write%20spark-compliance%3Arooms_read%20spark-compliance%3Arooms_write%20spark-compliance%3Ateam_memberships_read%20spark-compliance%3Ateam_memberships_write%20spark-compliance%3Ateams_read%20spark-compliance%3Awebhooks_read%20spark-compliance%3Awebhooks_write%20spark%3Aall%20spark%3Aapplications_token%20spark%3Acalls_read%20spark%3Acalls_write%20spark%3Adevices_read%20spark%3Adevices_write%20spark%3Akms%20spark%3Aorganizations_read%20spark%3Apeople_write%20spark%3Aplaces_read%20spark%3Aplaces_write%20spark%3Arecordings_read%20spark%3Arecordings_write%20spark%3Atelephony_config_read%20spark%3Atelephony_config_write%20spark%3Awebrtc_calling%20spark%3Axapi_commands%20spark%3Axapi_statuses%20spark%3Axsi&state=set_state_here';
        // dd($authorizationUrl);
         return response()->json(['authorization_url' => $authorizationUrl]);

    }


    public function storeTokens(Request $request)
{
    $validatedData = $request->validate([
        'access_token' => 'required|string',
        'refresh_token' => 'required|string',
        'expires_in' => 'required|integer',
    ]);

    $expiresAt = now()->addSeconds($validatedData['expires_in']);

    WebexToken::updateOrCreate(
        [], // No conditions, update or create the first record
        [
            'access_token' => $validatedData['access_token'],
            'refresh_token' => $validatedData['refresh_token'],
            'expires_at' => $expiresAt,
        ]
    );

    return response()->json(['message' => 'Tokens stored successfully']);
}



public function createMeeting(Request $request)
{
     $validatedData = $request->validate([
        'title' => 'required|string',
        'start' => 'required|date',
        'startTime' => 'required|string',
       //'end' => 'required|date|after:start',
        'endTime' => 'required|string',
       // 'invitees' => 'nullable|array',
        'duration' => 'nullable|string',
        'meetingType' => 'nullable|string',
        'meetingRoom' => 'nullable|string',
        'location' => 'nullable|string',
        'password' => 'nullable|string',
        'timezone' => 'required|string',
    ]);

      
    //  retrieve tokens from the database
    $webexToken = Token::first();

    //dd($webexToken);

    if ($webexToken) {
        $accessToken = $webexToken->access_token;
        $refreshToken = $webexToken->refresh_token;
        $tokenExpiresAt = $webexToken->expires_in;
        $refreshtokenExpiresAt = $webexToken->refresh_token_expires_in;
      
        // Check if the token has expired
        if (now()->gt($tokenExpiresAt)) {
            // Token has expired, attempt to refresh
            $refreshResponse = Http::asForm()->post('https://webexapis.com/v1/access_token', [
                'grant_type' => 'refresh_token',
                'client_id' => env('WEBEX_CLIENT_ID'),
                'client_secret' => env('WEBEX_CLIENT_SECRET'),
                'refresh_token' => $refreshToken,
            ]);

           // dd($refreshResponse);
              if ($refreshResponse->successful()) {
                 $newTokens = $refreshResponse->json();

              //  dd($newTokens);

                $accessTokenExpiresIn = now()->addSeconds($newTokens['expires_in'])->addDays(60);
                $refreshTokenExpiresIn = now()->addSeconds($newTokens['refresh_token_expires_in'])->addDays(90);
              
               // Update the database with new tokens
               $webexToken->update([
                'access_token' => $newTokens['access_token'],
                'refresh_token' => $newTokens['refresh_token'],
                'expires_in' => $accessTokenExpiresIn,
                'refresh_token_expires_in' => $refreshTokenExpiresIn,
            ]);
               $accessToken = $newTokens['access_token'];
         
               // dd($accessTokenExpiresIn);
            } else {
                $error = $refreshResponse->json()['error'] ?? 'Failed to refresh access token';
                return response()->json(['error' => $error], $refreshResponse->status());
            }
        }
    } else {
        // No tokens found in the database, get token from local storage
        $accessToken = $request->header('X-Access-Token');
        $refreshToken = $request->header('X-Refresh-Token');
        $expireIn = $request->header('X-Expire-In');
        $refreshtokenExpireIn = $request->header('X-RefreshtokenExpire-In');
        $roleId = $request->header('X-Role-Id');

        if (!$accessToken || !$refreshToken || !$expireIn) {
            return response()->json(['error' => 'Tokens not found '], 400);
        }

       // $expireIn is in seconds  to extend it by 30 days
        $expireInSeconds = $expireIn + (30 * 24 * 60 * 60); // 30 days in seconds
           // convert the token expiration duration into a specific date and time
        $tokenExpiresAt = now()->addSeconds($expireInSeconds);

        // $tokenExpiresAt = now()->addSeconds($expireIn);
      
        $refreshtokenExpiresAt = now()->addSeconds($refreshtokenExpireIn);

      
       // Save the tokens to the database
        $webexToken = Token::updateOrCreate(
           // ['user_id' => auth()->user()->id],
            [   'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'expires_in' => $tokenExpiresAt,
                'refresh_token_expires_in' => $refreshtokenExpiresAt
            ]
        );
    }
   // $invitees = $request->input('invitees', []);
   $invitees = $request->input('invitees');
  // \Log::info('Invitees:', ['invitees' => $invitees]);
    // Create payload for Webex API
    $webexPayload = [
        'title' => $request->input('title'),
        'start' => $request->input('start') . 'T' . $request->input('startTime'),
        'end' => $request->input('end') . 'T' . $request->input('endTime'),
        'duration' => $request->input('duration'),
        'meetingType' => $request->input('meetingType'),
        'meetingRoom' => $request->input('meetingRoom'),
        'location' => $request->input('location'),
       // 'invitees' => $request->input('invitees'),
       
       'invitees' => $invitees,
        'reminderTime' => 10,
        'resources' => ['FREQ=Daily'],
        'excludePassword' => true,
        'password' => $request->input('password'),
        'timezone' => $request->input('timezone'),
        'meetingOptions' => [
            'enabledChat' => true,
            'enabledVideo' => true,
            'enabledNote' => true,
            'noteType' => 'allowAll',
            'enabledFileTransfer' => true,
            'enabledUCFRichMedia' => false
        ],
              
    ];
    
    \Log::info('Webex Payload:', $webexPayload);

    //  create the meeting
    $response = Http::withToken($accessToken)
        ->post('https://webexapis.com/v1/meetings', $webexPayload);

     \Log::info('Webex API Response:', [
        'status' => $response->status(),
        'body' => $response->body()
    ]);
 
\Log::info('Webex API Response:', [$response]);
    if ($response->successful()) {
        $webexMeetingData = $response;
	//	dd($webexMeetingData);

       
     
       try {
            $meeting = new Meeting();
            $meeting->title = $webexMeetingData['title'];
            $meeting->start = $request->input('start');
            $meeting->startTime = $request->input('startTime');
            $meeting->end = $request->input('end');
            $meeting->endTime = $request->input('endTime');
            $meeting->duration = $request->input('duration');
            $meeting->meetingType = $request->input('meetingType');
            $meeting->meetingRoom = $request->input('meetingRoom');
            $meeting->location = $request->input('location');
            $meeting->web_link = $webexMeetingData['webLink'];
            $meeting->meeting_id = $webexMeetingData['id'];
           // $meeting->invitees = $webexMeetingData['invitees'] ?? [];
          // \Log::info('Invitees Data:', ['invitees' => $webexMeetingData['invitees']]);

          $meeting->invitees = json_encode($invitees);
            $meeting->save();

            return response()->json(['message' => 'Meeting created successfully', 'meeting' => $meeting], 201);
        } catch (\Exception $e) {
            \Log::error('Error', [
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'controller' => 'WebexController',
                'method' => 'createMeeting'
            ]);
            return response()->json(['error' => 'Failed to save meeting'], 500);
        }
    } else {
        return response()->json(['error' => 'Failed to create meeting via Webex API'], $response->status());
    }

}








  /* 
    public function handleWebexCallback(Request $request)

    {
        \Log::info('Webex callback received', $request->all());

        $clientId = env('WEBEX_CLIENT_ID');
        $clientSecret = env('WEBEX_CLIENT_SECRET');
        $redirectUri = env('WEBEX_REDIRECT_URI');
        $code = $request->query('code');

        \Log::info('Client ID: ' . env('WEBEX_CLIENT_ID'));

        if (is_null($code)) {
            return response()->json(['error' => 'Authorization code not received'], 400);
        }
    
        $tokenResponse = Http::asForm()->post('https://webexapis.com/v1/access_token', [
            'grant_type' => 'authorization_code',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'code' => $code,
            'redirect_uri' => $redirectUri,
        ]);
       // dd($tokenResponse);
    \Log::info('Token Response: ', $tokenResponse->json());
        if ($tokenResponse->successful()) {
            $tokens = $tokenResponse->json();

            \Log::info('Tokens received from Webex:', $tokens);
    
            // Store tokens in session
            session([
                'WEBEX_ACCESS_TOKEN' => $tokens['access_token'],
                'WEBEX_REFRESH_TOKEN' => $tokens['refresh_token'],
                'WEBEX_TOKEN_EXPIRES_AT' => now()->addHour($tokens['expires_in']),
            ]);
    
            return response()->json(['message' => 'Tokens obtained successfully']);
        } else {
            $error = $tokenResponse->json()['error'] ?? 'Failed to obtain tokens';
            return response()->json(['error' => $error], $tokenResponse->status());
        }
    }
     
*/






   
/*
    public function createMeeting(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string',
           // 'start' => 'required|date',
            //'end' => 'required|date|after:start',
            'invitees' => 'nullable|array',
            'duration' => 'nullable|string',
            'meetingRoom' => 'nullable|string',
            'location' => 'nullable|string',
            'password' => 'nullable|string',
           
        ]);

        $accessToken = $request->header('X-Access-Token');
        $expireIn = $request->header('X-Expire-in');
        $refreshToken = $request->header('X-Refresh-Token');

      
      //   dd($accessToken);
        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token not found'], 400);
        }
        
            if(!$accessToken){

            return response()->json(['error'=>'Access token not found'],400);
        }

        if (!$expireIn) {
            return response()->json(['error' => 'Expires in value is missing'], 400);
        }

        $tokenExpiresAt = now()->addSeconds($expireIn);
        // Store tokens in session
        session([
            'WEBEX_ACCESS_TOKEN' => $accessToken,
            'WEBEX_REFRESH_TOKEN' => $refreshToken,
            'WEBEX_TOKEN_EXPIRES_AT' => $tokenExpiresAt,
        ]);

        // Retrieve tokens from session
        $accessToken = session('WEBEX_ACCESS_TOKEN');
        $refreshToken = session('WEBEX_REFRESH_TOKEN');
        $tokenExpiresAt = session('WEBEX_TOKEN_EXPIRES_AT');
     
         dd($accessToken);

      //  $tokenExpiresAt = now()->addSeconds($expireIn);

        //  dd($tokenExpiresAt);
          //  \Log::info('Access Token: ', ['AccessToken' => $accessToken]);
          //  \Log::info('Refresh Token: ', ['RefreshToken' => $refreshToken]);
          //  \Log::info('Token Expires At: ', ['expires_at' => $tokenExpiresAt]);
          //  \Log::info('Current Time: ', ['now' => now()]);
        
        
            if (now()->gt($tokenExpiresAt)) {
               
                $refreshResponse = Http::asForm()->post('https://webexapis.com/v1/access_token', [
                    'grant_type' => 'refresh_token',
                    'client_id' => env('WEBEX_CLIENT_ID'),
                    'client_secret' => env('WEBEX_CLIENT_SECRET'),
                    'refresh_token' => $refreshToken,
                ]); 
                \Log::info('Client ID: ' . env('WEBEX_CLIENT_ID'));
            //  dd($refreshResponse);

          //  \Log::info('Refresh Response: ', ['response' => $refreshResponse->json()]);
                if ($refreshResponse->successful()) {
                    $newTokens = $refreshResponse->json();

                //   dd($newTokens);

                    // Update the stored tokens
                    session([
                        'WEBEX_ACCESS_TOKEN' => $newTokens['access_token'],
                        'WEBEX_REFRESH_TOKEN' => $newTokens['refresh_token'],
                        'WEBEX_TOKEN_EXPIRES_AT' => now()->addHour($newTokens['expires_in']),
                    ]);

                    $accessToken = $newTokens['access_token'];
                    $refreshToken =$newTokens['refresh_token'];

                   } else {
                
                    $error = $refreshResponse->json()['error'] ?? 'Failed to refresh access token';
                    return response()->json(['error' => $error], $refreshResponse->status());
                }
            }
        // Create payload for Webex API
        $webexPayload = [
        

            'title' => $request->input('title'),
                    'agenda'=>$request->input('agenda'),
                   // 'start' => $request->input('start'),
                   // 'end' => $request->input('end'),
                   'start' => $request->input('start') . 'T' . $request->input('startTime'),
                   'end' => $request->input('end') . 'T' . $request->input('endTime'),
                    'invitees' => $request->input('invitees'),
                    'duration' => $request->input('duration'),
                    'meetingType' => $request->input('meetingType'),
                    'meetingRoom' => $request->input('meetingRoom'),
                    'location' => $request->input('location'),
                    'reminderTime' => 10,
                    'excludePassword'=>true,
                    'password' => $request->input('password'),
                    'timezone' => $request->input('timezone'),
                    'meetingOptions' => [
                                'enabledChat' => true,
                                'enabledVideo' => true,
                                'enabledNote' => true,
                                'noteType' => 'allowAll',
                                'enabledFileTransfer' => true,
                                'enabledUCFRichMedia' => false
                         ],
        ];

            $response = Http::withToken($accessToken)
            ->post('https://webexapis.com/v1/meetings', $webexPayload);

        \Log::info('webexMeeting',[$response]);
       // dd($response);
    // Check if request to Webex API was successful
    if ($response->successful()) {
     
        $webexMeetingData = $response->json();

      $start = $request->input('start');
      $startTime = $request->input('startTime');
      $end = $request->input('end');
      $endTime = $request->input('endTime');
      $duration = $request->input('duration');
      $meetingType = $request->input('meetingType');
      $meetingRoom = $request->input('meetingRoom');
      $location = $request->input('location');
  
     // $inviteess = $request->input('invitees', []);
   
    try {
         $meeting = new Meeting();
         $meeting->title = $webexMeetingData['title'];
      //  $meeting->agenda = $webexMeetingData['agenda'];
       // $meeting->start = $webexMeetingData['start'];
       // $meeting->end = $webexMeetingData['end'];

      // Extract date and time
      $meeting->start = $start;
      $meeting->startTime = $startTime;
      $meeting->end = $end;
      $meeting->endTime = $endTime;

      $meeting->duration = $duration;
      $meeting->meetingType =$meetingType;
      $meeting->meetingRoom =  $meetingRoom;
      $meeting->location = $location;
   //  $meeting->invitees = $participants;
   //  $meeting->participant = $webexMeetingData['invitees'];
      $meeting->web_link = $webexMeetingData['webLink'];
       $meeting->meeting_id = $webexMeetingData['id'];
        $meeting->save();

            return response()->json(['message' => 'Meeting created successfully', 'meeting' => $meeting], 201);
            } catch (\Exception $e) {
                \Log::error('Error Saving Meeting', [
                    'error' => $e->getMessage(),
                    'line' => $e->getLine(),
                    'controller' => 'WebexController',
                    'method' => 'createMeeting'
                ]);
                return response()->json(['error' => 'Failed to save meeting'], 500);
            }
        } else {
            return response()->json(['error' => 'Failed to create meeting via Webex API'], $response->status());
        }

      }

*/

        public function getMeetingList(Request $request){

            $msg            = "Meeting Data Retrieved Successfully";
            $responseData   = [];
            $status         = "Success";
            $success        = true;
            $statusCode     = 200;
            
            try {
                $responseData = \DB::table('meetings')
                ->select('id', 'title', 'meeting_id', 'web_link','meetingType',
                \DB::raw('DATE_FORMAT(start, "%Y-%m-%d") as start'),
                \DB::raw('DATE_FORMAT(startTime, "%H:%i") as startTime'),
                \DB::raw('DATE_FORMAT(endTime,"%H:%i") as endTime'),
                 'meetingRoom','invitees')
                ->where('deletedFlag', 0)
                ->whereNotNull('meeting_id')
                ->whereNotNull('web_link')
                ->orderBy('id', 'DESC')
                ->get();
        
                if ($responseData->isEmpty()) {
                    $msg = 'No record found.';
                    $success = true;
                    $status = "SUCCESS";
                    $statusCode = 200;
                }else{
                    foreach ($responseData as $record) {
                        // Get invitees string
                        $invitees = $record->invitees;
                         // Clean and decode the JSON string
                        $InviteesData = stripslashes($invitees);
                        $InviteesData = htmlspecialchars_decode($InviteesData);
                        $InviteesData = trim($InviteesData, '"');
            
                        // Decode JSON string into array
                        $inviteesArray = json_decode($InviteesData, true);
            
                        // Check for JSON decode errors
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $record->invitees = $inviteesArray;
                            $record->inviteeCount = is_array($inviteesArray) ? count($inviteesArray) : 0;
                        } else {
                            \Log::error('JSON Decode Error:', ['error' => json_last_error_msg()]);
                            $record->invitees = [];
                            $record->inviteeCount = 0;
                        }
                    }
                }
                    
              } catch (\Throwable $t) {
                \Log::error("Error", [
                    'Controller' => 'WebexController',
                    'Method' => 'getMeetingList',
                    'Error'  => $t->getMessage()
                ]);
                $status = "ERROR";
                $msg = 'Something went wrong';
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
 

// participant attandances
    public function getMeetingParticipants($meetingId)

     {

     $accessToken = 'OWUxZmJiNjItNjE5NC00MzZmLThkMzAtZjEwZDNmNzZjMWYxN2ZjZTkxZGYtZjY1_P0A1_690d2feb-a523-4426-a093-aacada00d168';

      if (!$accessToken) {
        return response()->json(['error' => 'Access token not found'], 400);
    }

    $url = "https://webexapis.com/v1/meetingParticipants";

    $params = [
            'meetingId' => $meetingId
        ];

    try {
      
        $response = Http::withToken($accessToken)->get($url, $params);

        if ($response->successful()) {
            $participants = $response->json();
            return response()->json($participants);
        } else {
           if ($response->status() === 404) {
                return response()->json(['error' => 'Meeting or participants not found'], 404);
            }

            $errorMessage = $response->json()['message'] ?? 'Failed to fetch meeting participants';
            return response()->json(['error' => $errorMessage], $response->status());
        }
    } catch (\Exception $e) {
         \Log::error('Error fetching meeting participants:', ['exception' => $e]);
        return response()->json(['error' => 'Failed to fetch meeting participants'], 500);
    }
}

     
            


public function refreshToken(Request $request)
{
    $refreshToken = $request->input('refresh_token');

    $response = Http::asForm()->post('https://webexapis.com/v1/access_token', [
        'grant_type' => 'refresh_token',
        'client_id' => env('WEBEX_CLIENT_ID'),
        'client_secret' => env('WEBEX_CLIENT_SECRET'),
        'refresh_token' => $refreshToken,
    ]);

    if ($response->successful()) {
        $tokens = $response->json();

         session([
            'WEBEX_ACCESS_TOKEN' => $tokens['access_token'],
            'WEBEX_REFRESH_TOKEN' => $tokens['refresh_token'],
            'WEBEX_TOKEN_EXPIRES_AT' => now()->addSeconds($tokens['expires_in']),
        ]);

        return response()->json($tokens);
    } else {
        return response()->json(['error' => 'Failed to refresh token'], $response->status());
    }
}


}

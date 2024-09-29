<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class MeetingController extends Controller
{
    private $webexBaseUrl;
    private $accessToken;

    public function __construct()
    {
        $this->webexBaseUrl = env('WEBEX_BASE_URL', 'https://webexapis.com/v1');
       // $this->accessToken = Session::get('webex_access_token');
       $this->accessToken = env('WEBEX_ACCESS_TOKEN');

      // dd($this->accessToken);
    }

    public function handleOAuthCallback(Request $request)
    {
        $code = $request->query('code');

       // dd($code);

        if (!$code) {
            return response()->json(['error' => 'Authorization code not provided'], 400);
        }

        try {
            $response = Http::asForm()->post($this->webexBaseUrl . '/access_token', [
                'grant_type' => 'authorization_code',
                'client_id' => env('WEBEX_CLIENT_ID'),
                'client_secret' => env('WEBEX_CLIENT_SECRET'),
                'code' => $code,
                'redirect_uri' => env('WEBEX_REDIRECT_URI'),
                'scope' => 'spark:all' // Adjust scope based on your requirements
            ]);

            $responseData = $response->json();

            if (isset($responseData['access_token'])) {
                Session::put('webex_access_token', $responseData['access_token']);
                return redirect('/create-meeting-form'); // Redirect to the form to create a meeting
            } else {
                return response()->json(['error' => 'Failed to retrieve access token'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Failed to retrieve access token: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to retrieve access token'], 500);
        }
    }

    public function createMeeting(Request $request)
    {
      
        if (!$this->accessToken) {
            return response()->json(['error' => 'Access token not found'], 401);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
           // 'email' => 'required|email',
        ]);
    
        $meetingData = [
            'title' => $request->title,
            'start' => $request->start,
            'end' => $request->end,
            'password' => 'random-password', // Optional: You can generate a random password
            'enabledAutoRecordMeeting' => false, // Optional: Adjust as per your requirements
            'sendEmail' => true, // Optional: Whether to send an email invitation
            'invitees' => [
                ['email' => $request->email],
            ],
        ];

        try {
            $response = Http::withToken($this->accessToken)
                ->post($this->webexBaseUrl . '/meetings', $meetingData);

            $responseData = $response->json();
           // dd($responseData);
            return response()->json(['meeting' => $responseData], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create meeting: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create meeting'], 500);
        }
    }
}

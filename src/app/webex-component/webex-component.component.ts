import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WebexServiceService } from '../services/webex-service.service';

@Component({
  selector: 'app-webex-component',
  templateUrl: './webex-component.component.html',
  styleUrls: ['./webex-component.component.css']
})
export class WebexComponentComponent implements OnInit {

  accessToken:string='';
  meetingDetails:any;
  constructor(
    private route: ActivatedRoute,
    private webexService: WebexServiceService
  ) { }

  ngOnInit(): void {
    // Handle callback on component initialization
    this.handleCallback();
  }

  authorizeWebex(): void {
    this.webexService.authorizeWebex().subscribe(
      (response: any) => {
        console.log('Authorization successful', response);
        // Assuming response contains the authorization URL to redirect
        window.location.href = response.authorization_url; // Redirect to Webex authorization page
      },
      (error: any) => {
        console.error('Authorization error', error);
      }
    );
  }

  handleCallback(): void {
    // Get code parameter from URL query string
    this.route.queryParams.subscribe(params => {
      const code = params['code'];

      if (code) {
        console.log('Authorization code received', code);

        // Handle the callback with the obtained code
        this.webexService.handleWebexCallback(code).subscribe(
          (callbackResponse: any) => {
            console.log('Callback handled successfully', callbackResponse);
           // const accessToken = callbackResponse.access_token;
           // this.webexService.setAccessToken(accessToken); // Store the access token
          },
          (callbackError: any) => {
            console.error('Callback error', callbackError);
          }
        );
      } else {
        console.error('Authorization code is undefined or null');
      }
    });
  }

  createMeeting(): void {
    const meetingData = {
      title: 'Sample Meeting',
      start: '2024-07-12T10:00:00Z',
      end: '2024-07-12T11:00:00Z',
      password: 'sample_password',
      timezone: 'UTC' 
    };

    this.webexService.createMeeting(meetingData).subscribe(
      (response: any) => {
        console.log('Meeting created successfully', response);
      
      },
      (error: any) => {
        console.error('Meeting creation error', error);
      
      }
    );
  }
 
}

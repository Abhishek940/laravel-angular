import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebexServiceService } from '../services/webex-service.service';

@Component({
  selector: 'app-webex-callback-component',
  templateUrl: './webex-callback-component.component.html',
  styleUrls: ['./webex-callback-component.component.css'],
})
export class WebexCallbackComponentComponent implements OnInit {
  accessToken:string='';
  meetingDetails:any;
  code: any;
  private authorizationCode!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webexService: WebexServiceService
  ) { }

 /*  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log('Query Params:', params); // Log all query parameters
      console.log('Authorization Code:', code); // Log the authorization code

      if (code) {
        this.createMeeting(code); // Call createMeeting with the authorization code
      } else {
        console.error('Authorization code not found in query parameters');
        // Handle error condition where no code is present
      }
    });
  }
 */

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.authorizationCode = params['code'];
      console.log('Authorization Code:', this.authorizationCode); 
    });
  }

  /* createMeeting(code:any): void {
    const meetingData = {
      code:code,
      title: 'Sample Meeting',
      start: '2024-07-12T10:00:00Z',
      end: '2024-07-12T11:00:00Z',
      password: 'sample_password',
      timezone: 'UTC'
    };

   console.log(meetingData);
   console.log('Access Token:', this.webexService.getAccessToken());
    this.webexService.createMeeting(meetingData).subscribe(
      (response: any) => {
        console.log('Meeting created successfully', response);
      },
      (error: any) => {
        console.error('Meeting creation error', error);
      }
    );
  } */


    createMeeting(): void {
      if (!this.authorizationCode) {
        console.error('Authorization code not found.');
        return;
      }
  
      const meetingData = {
        code: this.authorizationCode,
        title: 'Sample Meeting',
        start: '2024-07-12T10:00:00Z',
        end: '2024-07-12T11:00:00Z',
        password: 'sample_password',
        timezone: 'UTC'
      };
  
      console.log('Meeting Data:', meetingData);
      const accessToken = this.webexService.getAccessToken(); // Retrieve access token from AuthService
      console.log('Access Token:', accessToken);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebexServiceService {


  private apiUrl = 'http://localhost:8000/api';
  //private accessToken: string = '';
  private headers = { 'Content-Type': 'application/json' };


  private clientId: string = 'C6b48f4ff75511377e2e65c0639fb90f6030a367915e7869421080610b34aef9f';
  private clientSecret: string = '712adaa01000d6e7a18bb7f3cb07357b24fcd099bd1d0aeb69340da147b3c3c8';
  private redirectUri: string = 'http://localhost:4200/webex/callback';
  private webexUrl: string = 'https://webexapis.com/v1';
  private tokenUrl: string = 'https://webexapis.com/v1/access_token';
  private accessToken: string ='';

  constructor(private http: HttpClient) { }

   authorizeWebex() {
      return this.http.get(`${this.apiUrl}/webex/authorize`);
  }

  handleWebexCallback(code: string) {
      return this.http.get(`${this.apiUrl}/webex/callback?code=${code}`);
  }

  /* createMeeting(meetingData: any) {
      return this.http.post(`${this.apiUrl}/create/meeting`, meetingData);
  } 
 */
           


      exchangeCodeForToken(code: string): Observable<any> {
        const params = new HttpParams()
          .set('grant_type', 'authorization_code')
          .set('client_id', this.clientId)
          .set('client_secret', this.clientSecret)
          .set('code', code)
          .set('redirect_uri', this.redirectUri);
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });
    
        return this.http.post(this.tokenUrl, params.toString(), { headers })
          .pipe(
            catchError(error => throwError(error))
          );
      }
    
      setAccessToken(token: string): void {
        this.accessToken = token;
      }
    
      getAccessToken(): string {
        return this.accessToken;
      }

      createMeeting(meetingData: any): Observable<any> {
         const headers = new HttpHeaders({
        'Authorization': 'Bearer ${this.getAccessToken()}',
          'Content-Type': 'application/json'
        }); 
 
        return this.http.post(`${this.apiUrl}/create/meeting`, meetingData,{headers})
          
      }

          /* createMeeting(accessToken: string, meetingDetails: any) {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            });
        
            return this.http.post(`${this.apiUrl}/create/meeting`, meetingDetails, { headers });
          } */
}

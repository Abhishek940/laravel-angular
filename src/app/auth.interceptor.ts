import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const isTokenExpired = this.isTokenExpired(token);
      if (!isTokenExpired) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
         this.router.navigate(['/login']); 
       
      }
    }

    return next.handle(request);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
       if (decoded.exp === undefined) {
        return true; 
      }
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime; 
    } catch (error) {
      return true; 
   
  }
}
}

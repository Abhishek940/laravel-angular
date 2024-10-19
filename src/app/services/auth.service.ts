import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';
  private headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient) {
   }

    
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  } 

  isLoggedIn(): boolean {
      return localStorage.getItem('token') !== null;
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
   // this.setLoggedIn(false); // Update authentication state
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddUser`, userData);
  }

  getUserRole():Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/getUserRole`,{})

  }
  getUserData(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getuserData`,{})

  }

  getUserDataById(id:number){
    return this.http.post<any>(`${this.apiUrl}/getUserDataById`,{id})
  }

  updateUserData(post: any) {
   // const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.apiUrl}/updateUserData`, post);
  // return this.http.post<any>(`${this.apiUrl}/updateUserData`, JSON.stringify(post));
  }

  sendPassRestMail(post:any){
    return this.http.post<any>(`${this.apiUrl}/forgotPass`,post)
  }

  resetPassword(email: any, token: any, password: any,password_confirmation:any) {
    return this.http.post<any>(`${this.apiUrl}/password/reset`, { email, token, password,password_confirmation });
  }


  changePassword(currentPassword: any, new_password: any,password_confirmation:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/changePassword`, {currentPassword,new_password,password_confirmation });
  }

  searchRole(role: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/searchRoleData`, {role});
  }

  updateMultipleUserRoles(userIds:any) {
    return this.http.post<any>(`${this.apiUrl}/updateUserRole`, { userIds });
  }

  addCategory(categoryData: any) {
    return this.http.post<any>(`${this.apiUrl}/addCategory`, categoryData);
  }

  viewCategory(){
    return this.http.post<any>(`${this.apiUrl}/viewCategory`,{});
  }


}

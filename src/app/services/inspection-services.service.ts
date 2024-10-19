import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InspectionServicesService {
  private apiURL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}


  addConfigration(post: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/addconfigration`, post);
  }

  getConfigrationData(): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/getconfigrationData',
      // JSON.stringify(post)
      null
    );
  }

  searchConfigrationData(post: any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/searchConfigrationData', post);
  }

  deleteConfigrationData(id: any) {
    console.log(id);
    return this.httpClient.post(this.apiURL + '/deleteConfigrationData', {
      InspectionConfigrationId: id,
    });
  }

  getConfigrationDataById(id: number) {
    //console.log(id);
    return this.httpClient.post(this.apiURL + '/getConfigrationDataById', {
      InspectionConfigrationId: id,
    });
  }

  updateConfigrationData(post: any) {
    return this.httpClient.post(this.apiURL + '/updateConfigrationData', post);
  }

  getActiveConfigrationData(post: any): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/getActiveconfigrationData',
      JSON.stringify(post)
    );
  }

  getDistrict(post: any): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/getDistritData',
      JSON.stringify(post)
    );
  }

  getBlock(districtId: any): Observable<any> {
    //const post = { districtId };
    return this.httpClient.post(this.apiURL + '/getBlockData', { districtId });
  }

  getSchoolList(blockId: any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/getSchoolList', { blockId });
  }


  addsummerVacation(post: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/addsummerVacation`, post);
  }

  getsummerVacationList(): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/getsummerVacationData`, null);
  }

  getSummerVacationDataById(id: number) {
    console.log(id);
    return this.httpClient.post(this.apiURL + '/getSummerVacationDataById', {
      inspectionId: id,
    });
  }

  updateSummerVacationData(post: any): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/updateSummerVacationData',
      JSON.stringify(post),
   
    )
  }

  deleteSummerVacationData(id: number) {
    return this.httpClient.post(this.apiURL + '/deleteSummerVacationData', {
      inspectionId: id,
    });
  }

  

  getSummerVacationConfigrationData(): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/getSummerVacationConfigrationData',
      // JSON.stringify(post)
      null
    );
  }

}

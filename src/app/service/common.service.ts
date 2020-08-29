import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  GetAllNotificationUrl : string = "http://localhost/FindMyDoctor/GetAllNotification.php";
  GetDoctorNotificationUrl : string = "http://localhost/FindMyDoctor/GetDoctorNotification.php";
  GetUserNotificationUrl : string = "http://localhost/FindMyDoctor/GetUserNotification.php";
  
  constructor(private http : HttpClient) { }

  getAllNotification(){
    return this.http.get<any>(this.GetAllNotificationUrl).pipe();
  }
  getDoctorNotification(){
    return this.http.get<any>(this.GetDoctorNotificationUrl).pipe();
  }
  getUserNotification(){
    return this.http.get<any>(this.GetUserNotificationUrl).pipe();
  }

}

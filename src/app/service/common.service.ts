import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  HostUrl = environment.HostUrl;
  GetAllNotificationUrl : string = "/GetAllNotification.php";
  GetDoctorNotificationUrl : string = "/GetDoctorNotification.php";
  GetUserNotificationUrl : string = "/GetUserNotification.php";
  DoctorSpecialityUrl : string = "/Speciality.php"
  constructor(private http : HttpClient) { }

  getAllNotification(){
    return this.http.get<any>(this.HostUrl+this.GetAllNotificationUrl).pipe();
  }
  getDoctorNotification(){
    return this.http.get<any>(this.HostUrl+this.GetDoctorNotificationUrl).pipe();
  }
  getUserNotification(){
    return this.http.get<any>(this.HostUrl+this.GetUserNotificationUrl).pipe();
  }
  getDoctorSpeciality(){
    return this.http.get<any>(this.HostUrl+this.DoctorSpecialityUrl).pipe();
  }

}

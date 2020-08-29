import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorModule } from '../module/doctor.module';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  DoctorRegistrationRequestUrl : string = "http://localhost/FindMyDoctor/Doctor.php";
  setDoctorStatusUrl : string = "http://localhost/FindMyDoctor/SetDoctorStatus.php";
  addNotificationUrl : string = "http://localhost/FindMyDoctor/AddNotification.php";
  
  constructor(private http : HttpClient) {
   
  }
  
  getDoctorRequest(){
    return this.http.get<any>(this.DoctorRegistrationRequestUrl).pipe();
  }
  
  setDoctorStatus(Dr_Mobile:string,Status:string){
    let body = new FormData();
    body.append('Doctor_Mobile', Dr_Mobile);
    body.append('Status', Status);
    return this.http.post<any>(this.setDoctorStatusUrl,body).pipe();
  }
  
  addNotification(UserType:string,Text:string){
    let body = new FormData();
    body.append('UserType', UserType);
    body.append('Text', Text);
    return this.http.post<any>(this.addNotificationUrl,body).pipe();
  }
}

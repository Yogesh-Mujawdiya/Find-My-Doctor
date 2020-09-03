import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorModule } from '../module/doctor.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  HostUrl = environment.HostUrl;
  DoctorRegistrationRequestUrl : string = "/Doctor.php";
  setDoctorStatusUrl : string = "/SetDoctorStatus.php";
  addNotificationUrl : string = "/AddNotification.php";
  AddDoctorUrl : string = "/AddDoctor.php";
  DeleteDoctorUrl : string = "/DeleteDoctor.php";
  
  constructor(private http : HttpClient) {
   
  }
  
  getDoctorRequest(){
    return this.http.get<any>(this.HostUrl+this.DoctorRegistrationRequestUrl).pipe();
  }
  
  setDoctorStatus(Dr_Mobile:string,Status:string){
    let body = new FormData();
    body.append('Doctor_Mobile', Dr_Mobile);
    body.append('Status', Status);
    return this.http.post<any>(this.HostUrl+this.setDoctorStatusUrl,body).pipe();
  }
  
  addNotification(UserType:string,Text:string){
    let body = new FormData();
    body.append('UserType', UserType);
    body.append('Text', Text);
    return this.http.post<any>(this.HostUrl+this.addNotificationUrl,body).pipe();
  }

  
  AddDoctor(Mobile,Name,address,latitude,longitude,speciality,hospital_Name,
    consultation_Fee,opning_Time,closing_Time):any{
      let body = new FormData();
      body.append('MobileNo', Mobile);
      body.append('FullName', Name);
      body.append('Address', address);
      body.append('Latitude', latitude);
      body.append('Longitude', longitude);
      body.append('Speciality', speciality);
      body.append('Hospital_Name', hospital_Name);
      body.append('Consultation_Fee', consultation_Fee);
      body.append('Opning_Time', opning_Time);
      body.append('Closing_Time', closing_Time);
    return this.http.post<any>(this.HostUrl+this.AddDoctorUrl,body)
      .pipe();  
  }
  
  DeleteDoctor(Mobile):any{
      let body = new FormData();
      body.append('MobileNo', Mobile);
    return this.http.post<any>(this.HostUrl+this.DeleteDoctorUrl,body)
      .pipe();  
  }
}

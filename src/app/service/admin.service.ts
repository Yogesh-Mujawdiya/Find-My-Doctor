import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorModule } from '../module/doctor.module';
import { environment } from 'src/environments/environment';
import { SpecialityModule } from '../module/speciality.module';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  HostUrl = environment.HostUrl;
  DoctorRegistrationRequestUrl : string = "/Doctor.php";
  setDoctorStatusUrl : string = "/SetDoctorStatus.php";
  addNotificationUrl : string = "/AddNotification.php";
  AddDoctorUrl : string = "/AddDoctor.php";
  EditDoctorUrl : string = "/EditDoctor.php";
  DeleteDoctorUrl : string = "/DeleteDoctor.php";
  NotificationUrl : string = "/Notification.php";
  SpecialityUrl : string = "/Speciality.php";
  AddSpecialityUrl : string = "/SpecialityAdd.php"; 
  DeleteSpecialityUrl : string = "/SpecialityDelete.php";  
  DeleteNotificationUrl : string = "/NotificationDelete.php";  

  constructor(private http : HttpClient) {
   
  }
  
  getDoctorRequest(){
    return this.http.get<any>(this.HostUrl+this.DoctorRegistrationRequestUrl).pipe();
  }
  getNotification(){
    return this.http.get<any>(this.HostUrl+this.NotificationUrl).pipe();
  }
  getSpeciality(){
    return this.http.get<any>(this.HostUrl+this.SpecialityUrl).pipe();
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
  addSpeciality(Name:string){
    let body = new FormData();
    body.append('Name', Name);
    return this.http.post<any>(this.HostUrl+this.AddSpecialityUrl,body).pipe();
  }
  
  deleteSpeciality(Id:number){
    let body = new FormData();
    body.append('Id', Id.toString());
    return this.http.post<any>(this.HostUrl+this.DeleteSpecialityUrl,body).pipe();
  }
  
  deleteNotification(Id:number){
    let body = new FormData();
    body.append('Id', Id.toString());
    return this.http.post<any>(this.HostUrl+this.DeleteNotificationUrl,body).pipe();
  }

  
  AddDoctor(Mobile:string,Name:string,address:string,latitude:string,
    longitude:string,speciality:string,hospital_Name:string,
    consultation_Fee:string,opning_Time:string,closing_Time:string):any{
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
  
  EditDoctor(doctor:DoctorModule):any{
      let body = new FormData();
      body.append('Id', doctor.Id.toString());
      body.append('MobileNo', doctor.Mobile_No);
      body.append('FullName', doctor.Full_Name);
      body.append('Address', doctor.Address);
      body.append('Latitude', doctor.Latitude.toString());
      body.append('Longitude', doctor.Longitude.toString());
      body.append('Speciality', doctor.Speciality);
      body.append('Hospital_Name', doctor.Hospital_Name);
      body.append('Consultation_Fee', doctor.Consultation_Fee.toString());
      body.append('Opning_Time', doctor.Opning_Time);
      body.append('Closing_Time', doctor.Closing_Time);
    return this.http.post<any>(this.HostUrl+this.EditDoctorUrl,body)
      .pipe();  
  }
  
  DeleteDoctor(Mobile):any{
      let body = new FormData();
      body.append('MobileNo', Mobile);
    return this.http.post<any>(this.HostUrl+this.DeleteDoctorUrl,body)
      .pipe();  
  }
}

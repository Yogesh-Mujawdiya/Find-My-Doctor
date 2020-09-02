import { Component, HostListener } from '@angular/core';
import { Router , Event, NavigationStart, NavigationEnd } from '@angular/router';
import { AccountService } from './service/account.service';
import { CommonService } from './service/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from './module/notification.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find-My-Doctor';
  Notification:NotificationModule[];
  isUserLogin : boolean;
  isUser:boolean;
  TagName : string = "SearchDoctor";

  constructor(private accountService:AccountService,
    private commonService:CommonService,
    private router: Router) { 
      this.updateData();
      // router.events.forEach((event) => {
      //   if(event instanceof NavigationStart) {
      //     if(this.accountService.getUserType()!=null)
      //       this.isUserLogin=true;
      //     else
      //       this.isUserLogin=false;
      //   }
      // });
      setInterval(() => {
        this.UpdateLoginInfo();
      }, 100);
  }

  UpdateLoginInfo(){
    if(this.isUserLogin!==this.accountService.isLogin()){
      this.updateData();
    }
  }
  
  updateData(){
    if(this.accountService.getUserType()!=null){
      this.isUserLogin = true;
      if(this.accountService.getUserType()=='Doctor'){
        this.router.navigateByUrl('doctor');
        this.commonService.getDoctorNotification().subscribe(data=>{
          this.Notification = <NotificationModule[]>data.NotificationList;
          this.Notification.sort(this.SortByDate);
        });
      }
      else if(this.accountService.getUserType()=='User'){
        this.isUser=true;
        this.router.navigateByUrl('');
        this.commonService.getUserNotification().subscribe(data=>{
          this.Notification = <NotificationModule[]>data.NotificationList;
          this.Notification.sort(this.SortByDate);
        });
      }
      else if(this.accountService.getUserType()=='Admin'){
        this.router.navigateByUrl('admin');
        this.commonService.getAllNotification().subscribe(data=>{
          this.Notification = <NotificationModule[]>data.NotificationList;
          this.Notification.sort(this.SortByDate);
        });
      }
    }
    else{
      this.isUser=false;
      this.isUserLogin=false;
    }
  }

  SortByDate(a:NotificationModule,b:NotificationModule):number{
    if(a.Time > b.Time)
      return -1;
    else if(a.Time > b.Time)
      return 1;
    return 0;
  }

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }

  Logout(){
    localStorage.clear();
    location.reload();
  }

}
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications-handling',
  templateUrl: './notifications-handling.component.html',
  styleUrls: ['./notifications-handling.component.css']
})
export class NotificationsHandlingComponent implements OnInit {

  UserType:string;
  NotificationText:string;
  
  constructor(private adminService:AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  AddNotification(){
    this.adminService.addNotification(this.UserType,this.NotificationText).subscribe(data=>{
      console.log(data);
      this.openSnackBar(data.message,data.status);
    });
  }
}

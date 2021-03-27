import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorModule } from 'src/app/module/doctor.module';
import { UserService } from 'src/app/service/user.service';
import { AccountService } from 'src/app/service/account.service';
import { UserModule } from 'src/app/module/user.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscribeOn } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-appointment',
    templateUrl: './dialog-appointment.component.html',
    styleUrls: ['./dialog-appointment.component.css']
})

export class DialogAppointmentComponent implements OnInit {
  DateTime:string;
  constructor(
    public dialogRef: MatDialogRef<DialogAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DoctorModule,
    private userService:UserService,
    private accountService:AccountService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(){

  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  SetAppointment(){
    this.userService.requestAppointment(this.data.Mobile_No,this.DateTime).subscribe(Data=>{
      this.openSnackBar(Data.message,Data.status);
      this.dialogRef.close();
    });
  }
} 
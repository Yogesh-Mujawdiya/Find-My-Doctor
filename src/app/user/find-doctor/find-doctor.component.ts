import { Component, OnInit } from '@angular/core';
import { DoctorModule } from 'src/app/module/doctor.module';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAppointmentComponent } from '../DialogAppointment/dialog-appointment.component';

@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})
export class FindDoctorComponent implements OnInit {
  AllDoctor:DoctorModule[]; 
  searchText:string;

  constructor(private userService:UserService,
    public dialog: MatDialog) {
    userService.getAllDoctor().subscribe( data =>{
      this.AllDoctor = <DoctorModule[]>data.DoctorList;
    });
  }

  ngOnInit(): void {
    
  }
  
  openDialog(doctor:DoctorModule): void {
    const dialogRef = this.dialog.open(DialogAppointmentComponent, {
      data: doctor
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  SetAppointment(doctor:DoctorModule){
    this.openDialog(doctor);
  }

}

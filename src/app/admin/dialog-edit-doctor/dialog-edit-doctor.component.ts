import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorModule } from 'src/app/module/doctor.module';
import { UserService } from 'src/app/service/user.service';
import { AccountService } from 'src/app/service/account.service';
import { UserModule } from 'src/app/module/user.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { subscribeOn, startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LocationServiceService } from 'src/app/service/location-service.service';
import { CommonService } from 'src/app/service/common.service';
import { SpecialityModule } from 'src/app/module/speciality.module';

@Component({
  selector: 'app-dialog-edit-doctor',
  templateUrl: './dialog-edit-doctor.component.html',
  styleUrls: ['./dialog-edit-doctor.component.css']
})

export class DialogEditDoctorComponent implements OnInit {
  Doctor: DoctorModule;
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;
  Latitude: any;
  Longitude: any;
  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<DialogEditDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DoctorModule,
    private userService: UserService,
    private locationService: LocationServiceService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.Doctor = new DoctorModule();
    this.Doctor.Id = data.Id;
    this.Doctor.Full_Name = data.Full_Name;
    this.Doctor.Mobile_No = data.Mobile_No;
    this.Doctor.Hospital_Name = data.Hospital_Name;
    this.Doctor.Speciality = data.Speciality;
    this.Doctor.Consultation_Fee = data.Consultation_Fee;
    this.Doctor.Address = data.Address;
    this.Doctor.Latitude = data.Latitude;
    this.Doctor.Longitude = data.Longitude;
    this.Doctor.Opning_Time = data.Opning_Time;
    this.Doctor.Closing_Time = data.Closing_Time;


    this.GetSpeciality();
  }


  GetSpeciality() {
    this.commonService.getDoctorSpeciality().subscribe(data => {
      console.log(data);
      let AllSpeciality = <SpecialityModule[]>data.SpecialityList;
      this.options = [];
      for (let o of AllSpeciality)
        this.options.push(o.Name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  GetAddress() {
    this.locationService.getCurrentLocation().then(pos => {
      this.Doctor.Latitude = pos.lat;
      this.Doctor.Longitude = pos.lng;

    });
  }

  EditDoctor() {
    this.adminService.EditDoctor(this.Doctor).subscribe(Data => {
      this.openSnackBar(Data.message, Data.status);
      if (Data.status != "Error") {
        this.data.Full_Name = this.Doctor.Full_Name;
        this.data.Mobile_No = this.Doctor.Mobile_No;
        this.data.Hospital_Name = this.Doctor.Hospital_Name;
        this.data.Speciality = this.Doctor.Speciality;
        this.data.Consultation_Fee = this.Doctor.Consultation_Fee;
        this.data.Address = this.Doctor.Address;
        this.data.Latitude = this.Doctor.Latitude;
        this.data.Longitude = this.Doctor.Longitude;
        this.data.Closing_Time = this.Doctor.Closing_Time;
        this.data.Opning_Time = this.Doctor.Opning_Time;
        this.dialogRef.close();
      }
    });
  }
}
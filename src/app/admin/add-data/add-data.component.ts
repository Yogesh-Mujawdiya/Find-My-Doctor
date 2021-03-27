import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LocationServiceService } from 'src/app/service/location-service.service';
import { startWith, map } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { SpecialityModule } from 'src/app/module/speciality.module';

@Component({
  selector: 'app-add-data.component',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  UserType: string;
  NotificationText: string;
  SpecialityName: string;

  Address: string = '';
  Mobile_No: string = '';
  Name: string = '';
  Speciality: string = '';
  Hospital_Name: string = '';
  Consultation_Fee: string = '';
  Open_Time: string = '';
  Close_Time: string = '';
  IsProgressing: boolean;
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private adminService: AdminService,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private locationService: LocationServiceService) {

    this.GetSpeciality();
  }

  ngOnInit(): void {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  AddNotification() {
    if (this.UserType != '' && this.UserType != undefined && this.NotificationText != '' && this.NotificationText != undefined) {
      this.adminService.addNotification(this.UserType, this.NotificationText).subscribe(data => {
        console.log(data);
        this.openSnackBar(data.message, data.status);
      });
    }
  }

  AddSpeciality() {
    if (this.SpecialityName == null || this.SpecialityName == '')
      return;
    this.adminService.addSpeciality(this.SpecialityName).subscribe(data => {
      console.log(data);
      this.openSnackBar(data.message, data.status);
    });
  }

  AddDoctor() {
    if (this.Mobile_No == '' || this.Name == '' || this.Address == '' || this.Speciality == '' ||
      this.Hospital_Name == '' || this.Consultation_Fee == '' || this.Open_Time == '' || this.Close_Time == '')
      return;
    if (this.options.indexOf(this.Speciality) == -1) {
      this.openSnackBar("If Dr. Speciality is not Available Select Others", "Error")
      return;
    }
    this.IsProgressing = true;
    this.locationService.getCurrentLocation().then(
      pos => {
        this.AddData(pos.lng, pos.lat);
      }
    );
  }

  AddData(latitude, longitude) {
    this.adminService.AddDoctor(this.Mobile_No, this.Name, this.Address, latitude, longitude, this.Speciality, this.Hospital_Name,
      this.Consultation_Fee, this.Open_Time, this.Close_Time).subscribe(
        data => {
          this.IsProgressing = false;
          this.openSnackBar(data.message, data.status);
        });
  }

}

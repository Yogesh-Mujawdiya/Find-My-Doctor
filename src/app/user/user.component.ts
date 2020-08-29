import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  TagName : string = "MyAppointment";
  constructor(private router : Router) { 
    this.GoTo('/user/MyAppointment');
  }

  ngOnInit(): void {
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }


}

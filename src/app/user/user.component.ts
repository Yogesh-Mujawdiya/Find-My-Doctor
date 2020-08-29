import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  TagName : string = "Home";
  constructor(private router : Router) { 
  }

  ngOnInit(): void {
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }


}

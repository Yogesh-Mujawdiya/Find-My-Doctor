import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  TagName : string = "Home";
  constructor(private router : Router,
    private accountService:AccountService) { 
      if(accountService.getUserType()!="User")
        this.router.navigateByUrl(''); 
      
    setInterval(() => {
      if(this.accountService.getUserType()!='User')
        this.router.navigateByUrl('');
    }, 100);

  }
  ngOnInit(): void {
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }


}

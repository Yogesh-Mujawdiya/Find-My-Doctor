import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService:AccountService,
    private router: Router) {
    if(!accountService.isLogin())
      this.GoTo('');
  }

  ngOnInit(): void {
  }

  
  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }
}

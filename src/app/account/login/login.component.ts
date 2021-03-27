import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  Mobile_No : string ='';
  Password :string ='';
  IsProgressing : boolean;
  
  constructor(private accountService:AccountService,
    private snackBar: MatSnackBar,
    private router: Router) {   
      if(accountService.isLogin())
        this.router.navigateByUrl('');
    }

  ngOnInit(): void {
    
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  Login(){
    if(this.Mobile_No=='' || this.Password=='')
      return;
    this.IsProgressing=true;
    this.accountService.Login(this.Mobile_No,this.Password).subscribe(
      data=>{
        console.log(data.UserData);
        if(data.status=="Success"){
          this.openSnackBar(data.status,data.message);
          localStorage.setItem('currentUserType', data.UserType);
          if(data.UserType == "Doctor"){
            localStorage.setItem('currentDoctor', JSON.stringify(data.UserData));
            this.router.navigateByUrl('doctor');
          }
          else if(data.UserType == "User"){
            localStorage.setItem('currentUser', JSON.stringify(data.UserData));
            this.router.navigateByUrl('user');
            console.log(localStorage.getItem('currentUser'));
          }
          else if(data.UserType == "Admin"){
            this.router.navigateByUrl('admin');
          }
        }
        else{
          this.openSnackBar(data.message,"Error")
        }
        this.IsProgressing=false;
      });
  }
  
}

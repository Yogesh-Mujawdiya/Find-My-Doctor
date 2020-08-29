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
  Mobile_No : string;
  Password :string;
  
  constructor(private accountService:AccountService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  Login(){
    this.accountService.Login(this.Mobile_No,this.Password).subscribe(
      data=>{
        console.log(data);
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
          }
          else if(data.UserType == "Admin"){
            this.router.navigateByUrl('admin');
          }
        }
        else{
          this.openSnackBar(data.message,"Error")
        }
      });
  }
  
}

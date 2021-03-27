import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { 
  Id:number;
  UserType:string;
  Text:string;
  Time:Date;
}

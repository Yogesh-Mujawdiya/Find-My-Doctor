import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component'
import { AdminHomeComponent } from './admin/admin-home/admin-home.component'
import { EditDataComponent } from './admin/edit-data/edit-data.component';
import { AccountComponent } from './account/account.component';
import { AccountHomeComponent } from './account/account-home/account-home.component';
import { LoginComponent } from './account/login/login.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ProfileComponent } from './account/profile/profile.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorHomeComponent } from './doctor/doctor-home/doctor-home.component';
import { AppointmentListComponent } from './doctor/appointment-list/appointment-list.component';
import { AppointmentRequestComponent } from './doctor/appointment-request/appointment-request.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { FindDoctorComponent } from './user/find-doctor/find-doctor.component';
import { MyAppointmentComponent } from './user/my-appointment/my-appointment.component';
import { AddDataComponent } from './admin/add-data/add-data.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'Account', component: AccountComponent ,
    children: [
      {
        path: '',
        component: AccountHomeComponent
      },
      {
        path: 'Login',
        component: LoginComponent
      },
      {
        path: 'SignUp',
        component: SignUpComponent
      },
      {
        path: 'Profile',
        component: ProfileComponent
      }
    ]
  },
  { path: 'admin', component: AdminComponent ,
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'EditData',
        component: EditDataComponent
      },
      {
        path: 'AddData',
        component: AddDataComponent
      }
    ]
  },
  { path: 'doctor', component: DoctorComponent ,
    // children: [
    //   {
    //     path: '',
    //     component: DoctorHomeComponent
    //   },
    //   {
    //     path: 'AppointmentRequest',
    //     component: AppointmentRequestComponent
    //   },
    //   {
    //     path: 'AppointmentList',
    //     component: AppointmentListComponent
    //   }
    // ]
  },
  { path: 'user', component: UserComponent ,
    children: [
      {
        path: 'Appointment',
        component: MyAppointmentComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

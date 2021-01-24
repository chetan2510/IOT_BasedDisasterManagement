import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {RescuerComponent} from "./rescuer/rescuer.component";
import {RescuerSignUpComponent} from "./rescuer-sign-up/rescuer-sign-up.component";


const routes: Routes = [
  {path: "admin", component: AdminComponent},
  {path: "user", component: UserComponent},
  {path: "rescuer", component: RescuerComponent},
  {path: "rescuersignup", component: RescuerSignUpComponent},
  {path: "", redirectTo:'/user', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

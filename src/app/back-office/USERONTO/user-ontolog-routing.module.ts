import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserOntologListComponent } from "./user-ontolog-list/user-ontolog-list.component";

const routes: Routes = [
  { path: "listUser", component: UserOntologListComponent },




];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOntologRoutingModule { }

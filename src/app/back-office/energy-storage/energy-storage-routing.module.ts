import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnergyStorageListComponent} from "./energy-storage-list/energy-storage-list.component";

const routes: Routes = [
  {path:"",component:EnergyStorageListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergyStorageRoutingModule { }

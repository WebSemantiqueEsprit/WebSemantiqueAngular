import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnergySourceListComponent } from './energy-source-list/energy-source-list.component';

const routes: Routes = [  { path: "listEnergySource", component: EnergySourceListComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergySourceRoutingModule { }

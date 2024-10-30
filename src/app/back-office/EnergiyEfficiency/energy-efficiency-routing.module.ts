import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnergyEfficiencyComponent} from "./energy-efficiency/energy-efficiency.component";

const routes: Routes = [
  { path: 'listEnergy', component: EnergyEfficiencyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergyEfficiencyRoutingModule { }

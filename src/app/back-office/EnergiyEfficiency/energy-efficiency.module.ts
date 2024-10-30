import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnergyEfficiencyComponent} from "./energy-efficiency/energy-efficiency.component";
import { EnergyEfficiencyRoutingModule } from './energy-efficiency-routing.module';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EnergyEfficiencyComponent,

  ],
    imports: [
        CommonModule,
        EnergyEfficiencyRoutingModule,
        FormsModule
    ]
})
export class EnergyEfficiencyModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergySourceRoutingModule } from './energy-source-routing.module';
import { EnergySourceListComponent } from './energy-source-list/energy-source-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnergySourceListComponent
  ],
  imports: [
    CommonModule,
    EnergySourceRoutingModule,
    FormsModule
  ]
})
export class EnergySourceModule { }

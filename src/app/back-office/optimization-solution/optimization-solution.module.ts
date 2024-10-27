import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptimizationSolutionRoutingModule } from './optimization-solution-routing.module';
import { SolutionListComponent } from './solution-list/solution-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SolutionListComponent
  ],
  imports: [
    CommonModule,
    OptimizationSolutionRoutingModule,
    FormsModule
  ]
})
export class OptimizationSolutionModule { }

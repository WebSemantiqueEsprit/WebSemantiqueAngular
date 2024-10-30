import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorPatternRoutingModule } from './behavior-pattern-routing.module';
import {BehaviorPatternComponent} from "./behavior-pattern/behavior-pattern.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BehaviorPatternComponent,

  ],
  imports: [
    CommonModule,
    BehaviorPatternRoutingModule,
    FormsModule

  ]
})
export class BehaviorPatternModule { }

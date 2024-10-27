import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsommationEnergieRoutingModule} from "./consommation-energie-routing.module";
import { ConsommationEnergieListComponent } from './consommation-energie-list/consommation-energie-list.component';

import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";



@NgModule({
  declarations: [
    ConsommationEnergieListComponent
  ],
  imports: [
    CommonModule ,
    ConsommationEnergieRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  exports: [ConsommationEnergieListComponent] // Exporting the component

})
export class ConsommationEnergieModule { }

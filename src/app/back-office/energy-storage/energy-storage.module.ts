import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergyStorageRoutingModule } from './energy-storage-routing.module';
import { EnergyStorageListComponent } from './energy-storage-list/energy-storage-list.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [
    EnergyStorageListComponent
  ],
  imports: [
    CommonModule,
    EnergyStorageRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class EnergyStorageModule { }

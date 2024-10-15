import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import { carbonfootprintRoutingModule } from './carbonfootprint-routing.module';
import { CarbonfootprintListComponent } from './carbonfootprint-list/carbonfootprint-list.component';


@NgModule({
  declarations: [
    CarbonfootprintListComponent
  ],
  imports: [
    CommonModule,
    carbonfootprintRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

  ]
})
export class carbonfootprintModule { }

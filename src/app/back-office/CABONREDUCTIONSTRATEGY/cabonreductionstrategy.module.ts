import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import { cabonreductionstrategyRoutingModule } from './cabonreductionstrategy-routing.module';
import { CarbonReductionStrategyListComponent } from './cabonreductionstrategy-list/cabonreductionstrategy-list.component';


@NgModule({
  declarations: [
    CarbonReductionStrategyListComponent
  ],
  imports: [
    CommonModule,
    cabonreductionstrategyRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,

  ]
})
export class cabonreductionstrategyModule { }

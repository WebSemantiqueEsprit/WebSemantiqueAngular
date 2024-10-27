import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserOntologRoutingModule } from './user-ontolog-routing.module';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { UserOntologListComponent } from "./user-ontolog-list/user-ontolog-list.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserOntologRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  exports:[]
})
export class UserOntologModule { }

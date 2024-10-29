import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractModuleRoutingModule } from './contract-module-routing.module';
import { ListContractComponent } from './list-contract/list-contract.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListContractComponent
  ],
  imports: [
    CommonModule,
    ContractModuleRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ContractModuleModule { }

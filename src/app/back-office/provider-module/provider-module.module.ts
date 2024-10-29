import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProviderComponent } from './list-provider/list-provider.component';
import { ProvidersRoutingModule } from './providers-module-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListProviderComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,


  ]
})
export class ProviderModuleModule { }

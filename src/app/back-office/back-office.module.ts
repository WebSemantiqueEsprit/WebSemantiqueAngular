import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { HomeBackComponent } from './home-back/home-back.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { BlocModule } from './bloc/bloc.module';
import {HttpClientModule} from '@angular/common/http' ;
import { FormsModule } from '@angular/forms';
import { UniversiteModule } from './universite/universite.module';
import { FoyerModule } from './foyer/foyer.module';
import { ConsommationEnergieListComponent } from './ConsommationENERGIE/consommation-energie-list/consommation-energie-list.component';
import { UserOntologListComponent } from './USERONTO/user-ontolog-list/user-ontolog-list.component';
import { ProviderModuleModule } from './provider-module/provider-module.module';








@NgModule({
  declarations: [


    BackOfficeComponent,
            HomeBackComponent,
            SidebarComponent,
            NavComponent,
            UserOntologListComponent,
         ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    BlocModule,
    ProviderModuleModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class BackOfficeModule { }

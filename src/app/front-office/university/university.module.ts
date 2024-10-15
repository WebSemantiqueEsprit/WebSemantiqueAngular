import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityRoutingModule } from './university-routing.module';
import { UniversityCartComponent } from './university-cart/university-cart.component';
import { FoyerDetailsComponent } from './foyer-details/foyer-details.component';


@NgModule({
  declarations: [  UniversityCartComponent, FoyerDetailsComponent],
  imports: [
    CommonModule,
    UniversityRoutingModule,
  
  ]
})
export class UniversityModule { }

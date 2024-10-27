import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsommationEnergieListComponent } from './consommation-energie-list/consommation-energie-list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: "listEnergie", component: ConsommationEnergieListComponent },




];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConsommationEnergieRoutingModule { }

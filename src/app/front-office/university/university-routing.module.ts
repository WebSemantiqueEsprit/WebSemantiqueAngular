import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityCartComponent } from './university-cart/university-cart.component';
import { FoyerDetailsComponent } from './foyer-details/foyer-details.component';

const routes: Routes = [
  {path:"university",component:UniversityCartComponent},
  { path: "foyer-details/:nomFoyer", component: FoyerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityRoutingModule { }

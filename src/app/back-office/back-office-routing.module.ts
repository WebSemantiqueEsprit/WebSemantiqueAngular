import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { HomeBackComponent } from './home-back/home-back.component';
import { AdminGuard } from "../helper/admin.guard";

const routes: Routes = [
  {path: '',
    canActivate:[AdminGuard],
    component: BackOfficeComponent,
    children: [
      {path:"bloc",loadChildren:()=> import('./bloc/bloc.module').then(m=>m.BlocModule)},
       {path:"universite",loadChildren:()=> import('./universite/universite.module').then(m=>m.UniversiteModule)},
        {path:"foyer",loadChildren:()=> import('./foyer/foyer.module').then(m=>m.FoyerModule)},
      {path:"chambre",loadChildren:()=>   import('./chambre/chambre.module').then(m=>m.ChambreModule)},
      {path:"reservation",loadChildren:()=>   import('./reservation/reservation.module').then(m=>m.ReservationModule)},

      {path:"carbonfootprint",loadChildren:()=>   import('./CARBONFOOTPRINT/carbonfootprint.module').then(m=>m.carbonfootprintModule)},
      {path:"connsamationEnergie",loadChildren:()=>   import('./ConsommationENERGIE/consommation-energie.module').then(m=>m.ConsommationEnergieModule)},
      { path: "energy-efficiency", loadChildren: () => import('./EnergiyEfficiency/energy-efficiency.module').then(m => m.EnergyEfficiencyModule) },
      {path: "behavior-pattern", loadChildren: () => import('./BehaviorPatterns/behavior-pattern.module').then(m => m.BehaviorPatternModule)},

      {path:"usersontolog",loadChildren:()=>   import('./USERONTO/user-ontolog.module').then(m=>m.UserOntologModule)},
      {path:"dashboard", component:HomeBackComponent}

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }

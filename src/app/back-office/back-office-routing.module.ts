import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { HomeBackComponent } from './home-back/home-back.component';
import {AdminGuard} from "../helper/admin.guard";

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
      {path:"storage",loadChildren:()=>   import('./energy-storage/energy-storage.module').then(m=>m.EnergyStorageModule)},
      {path:"solution",loadChildren:()=>   import('./optimization-solution/optimization-solution.module').then(m=>m.OptimizationSolutionModule)},
      {path:"cabonreductionstrategy",loadChildren:()=>   import('./CABONREDUCTIONSTRATEGY/cabonreductionstrategy.module').then(m=>m.cabonreductionstrategyModule)},
      {path:"device",loadChildren:()=>   import('./device/device.module').then(m=>m.DeviceModule)},
      {path:"energySource",loadChildren:()=>   import('./energy-source/energy-source.module').then(m=>m.EnergySourceModule)},


      {path:"usersontolog",loadChildren:()=>   import('./USERONTO/user-ontolog.module').then(m=>m.UserOntologModule)},
      {path:"dashboard", component:HomeBackComponent},

      {path:"providers", loadChildren:()=>   import('./provider-module/provider-module.module').then(m=>m.ProviderModuleModule)},
      {path:"contracts", loadChildren:()=>   import('./contract-module/contract-module.module').then(m=>m.ContractModuleModule)}

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarbonfootprintListComponent } from './carbonfootprint-list/carbonfootprint-list.component';


const routes: Routes = [
    { path: "listCarbone", component: CarbonfootprintListComponent },




];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class carbonfootprintRoutingModule {


}

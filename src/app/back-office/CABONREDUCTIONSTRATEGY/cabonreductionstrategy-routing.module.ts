import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarbonReductionStrategyListComponent } from './cabonreductionstrategy-list/cabonreductionstrategy-list.component';



const routes: Routes = [
    { path: "listCarboneReduction", component: CarbonReductionStrategyListComponent },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class cabonreductionstrategyRoutingModule {

}

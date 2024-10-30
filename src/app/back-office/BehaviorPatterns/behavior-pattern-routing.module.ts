import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorPatternComponent } from './behavior-pattern/behavior-pattern.component';

const routes: Routes = [
  { path: 'list-behavior-pattern', component: BehaviorPatternComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BehaviorPatternRoutingModule { }

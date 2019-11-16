import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HousesListComponent } from './houses-list/houses-list.component';

const routes: Routes = [{ path: '', component: HousesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousesRoutingModule {}

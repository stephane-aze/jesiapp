import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseDetailsComponent } from './house-details/house-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HousesListComponent },
  { path: ':id', component: HouseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousesRoutingModule {}

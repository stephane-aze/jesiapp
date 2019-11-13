import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [SharedModule, RootRoutingModule],
  exports: [NavComponent],
})
export class RootModule {}

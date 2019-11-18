import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [HomeComponent, NavComponent],
  imports: [SharedModule, RootRoutingModule, UserModule],
  exports: [NavComponent],
})
export class RootModule {}

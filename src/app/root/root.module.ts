import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { RootRoutingModule } from './root-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { EntityPreviewComponent } from './entity-preview/entity-preview.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [HomeComponent, NavComponent, EntityPreviewComponent, FavoritesComponent],
  imports: [SharedModule, RootRoutingModule, UserModule],
  exports: [NavComponent],
})
export class RootModule {}

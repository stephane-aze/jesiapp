import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HousesRoutingModule } from './houses-routing.module';
import { HousesListComponent } from './houses-list/houses-list.component';
import { HouseThumbnailComponent } from './house-thumbnail/house-thumbnail.component';

@NgModule({
  declarations: [HousesListComponent, HouseThumbnailComponent],
  imports: [SharedModule, HousesRoutingModule],
})
export class HousesModule {}

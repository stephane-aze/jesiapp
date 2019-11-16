import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterThumbnailComponent } from './character-thumbnail/character-thumbnail.component';

@NgModule({
  declarations: [CharactersListComponent, CharacterThumbnailComponent],
  imports: [SharedModule, CharactersRoutingModule],
})
export class CharactersModule {}

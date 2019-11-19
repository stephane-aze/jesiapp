import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterThumbnailComponent } from './character-thumbnail/character-thumbnail.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@NgModule({
  declarations: [CharactersListComponent, CharacterThumbnailComponent, CharacterCardComponent],
  imports: [SharedModule, CharactersRoutingModule],
  exports: [CharacterCardComponent],
})
export class CharactersModule {}

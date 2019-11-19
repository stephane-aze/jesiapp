import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../Character';

@Component({
  selector: 'jesi-character-thumbnail',
  templateUrl: './character-thumbnail.component.html',
  styleUrls: ['./character-thumbnail.component.scss'],
})
export class CharacterThumbnailComponent {
  @Input() public character!: Character;
  @Input() public isFavorite!: boolean;
  @Output() public chose = new EventEmitter<Character>();

  public openCharacterDetails(): void {
    this.chose.emit(this.character);
  }
}

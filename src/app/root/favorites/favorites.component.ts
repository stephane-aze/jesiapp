import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { CharactersService } from 'src/app/characters/characters.service';
import { HousesService } from 'src/app/houses/houses.service';
import { Character } from 'src/app/characters/Character';
import { House } from 'src/app/houses/House';

@Component({
  selector: 'jesi-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  @Input() characterId: number;
  @Input() houseId: number;

  public character$!: Observable<Character>;
  public house$!: Observable<House>;

  public constructor(
    private readonly charactersService: CharactersService,
    private readonly housesService: HousesService,
  ) {}

  public ngOnInit(): void {
    this.fetchCharacter();
    this.fetchHouse();
  }

  private fetchCharacter() {
    if (this.characterId) {
      this.character$ = this.charactersService.getCharacter(this.characterId);
    }
  }

  private fetchHouse() {
    if (this.houseId) {
      this.house$ = this.housesService.getHouse(this.houseId);
    }
  }
}

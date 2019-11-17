import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { CharactersService } from '../characters.service';
import { Character } from '../Character';
import { DataLoaderService } from 'src/app/shared/data-loader.service';

@Component({
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  providers: [DataLoaderService],
})
export class CharactersListComponent implements OnInit, JesiappPage {
  public readonly pageTitle = 'Characters list';
  public readonly filterPlaceholder = 'Filter by name';

  public selectedCharacter!: Character;
  public filterInput!: string;
  public characters$!: Observable<Character[]>;

  public constructor(
    private charactersService: CharactersService,
    private charactersLoaderService: DataLoaderService<Character[]>,
  ) {}

  public ngOnInit(): void {
    this.initCharactersLoader();
  }

  public onFilter(): void {
    this.charactersLoaderService.transform(characters => {
      return characters.filter(character => {
        return character.nameStartsWith(this.filterInput);
      });
    });
  }

  public reset(): void {
    this.charactersLoaderService.reset();
    this.filterInput = '';
  }

  public onSelectCharacter(character: Character): void {
    this.selectedCharacter = character;
  }

  private initCharactersLoader(): void {
    const characters$ = this.listCharacters();
    this.charactersLoaderService.init(characters$);
    this.characters$ = this.charactersLoaderService.stream$;
  }

  private listCharacters(): Observable<Character[]> {
    return this.charactersService.listCharacters();
  }
}

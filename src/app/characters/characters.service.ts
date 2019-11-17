import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharactersResourceService } from './data-access';
import { Character } from './Character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  public constructor(private readonly resource: CharactersResourceService) {}

  public listCharacters(): Observable<Character[]> {
    return this.resource.fetchCharacters().pipe(map(Character.NEW_BUNCH));
  }

  public listHouseCharacters(houseId: number): Observable<Character[]> {
    return this.resource.fetchCharacters({ houseId }).pipe(map(Character.NEW_BUNCH));
  }

  public getCharacter(id: number): Observable<Character> {
    return this.resource.fetchCharacter(id).pipe(map(Character.NEW));
  }
}

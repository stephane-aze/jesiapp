import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharacterModel } from './CharacterModel';
import { CharacterShape } from './CharacterShape';

@Injectable({
  providedIn: 'root',
})
export class CharactersResourceService {
  private readonly resourcePath = '/api/characters';

  public constructor(private readonly http: HttpClient) {}

  public fetchCharacters(): Observable<CharacterShape[]> {
    return this.requestCharacters().pipe(
      map(data => data || []),
      map(CharacterShape.NEW_BUNCH),
    );
  }

  private requestCharacters(): Observable<CharacterModel[]> {
    const uri = this.resourcePath;
    return this.http.get<CharacterModel[]>(uri);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CharacterModel } from './CharacterModel';
import { CharacterShape } from './CharacterShape';

@Injectable({
  providedIn: 'root',
})
export class CharactersResourceService {
  private readonly resourcePath = '/api/characters';

  public constructor(private readonly http: HttpClient) {}

  public fetchCharacters(query?: { [key: string]: any }): Observable<CharacterShape[]> {
    return this.requestCharacters(query).pipe(
      map(data => data || []),
      map(CharacterShape.NEW_BUNCH),
    );
  }

  public fetchCharacter(id: number): Observable<CharacterShape> {
    return this.requestCharacter(id).pipe(
      switchMap(data => (data ? of(data) : throwError('No data'))),
      map(CharacterShape.NEW),
    );
  }

  private requestCharacters(query?: { [key: string]: any }): Observable<CharacterModel[]> {
    const uri = this.resourcePath;
    const params = this.buildParams(query);
    return this.http.get<CharacterModel[]>(uri, { params });
  }

  private requestCharacter(id: number): Observable<CharacterModel> {
    const uri = `${this.resourcePath}/${id}`;
    return this.http.get<CharacterModel>(uri);
  }

  private buildParams(query?: { [key: string]: any }): HttpParams {
    const httpParams = new HttpParams();

    if (!query) {
      return httpParams;
    }

    return Object.entries(query).reduce((params, [key, value]) => params.set(key, value), httpParams);
  }
}

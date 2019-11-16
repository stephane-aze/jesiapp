import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HouseShape } from './HouseShape';
import { HouseModel } from './HouseModel';

@Injectable({
  providedIn: 'root',
})
export class HousesResourceService {
  private readonly resourcePath = '/api/houses';

  public constructor(private readonly http: HttpClient) {}

  public fetchHouses(): Observable<HouseShape[]> {
    return this.requestHouses().pipe(
      map(data => data || []),
      map(HouseShape.NEW_BUNCH),
    );
  }

  public requestHouses(): Observable<HouseModel[]> {
    const uri = this.resourcePath;
    return this.http.get<HouseModel[]>(uri);
  }
}

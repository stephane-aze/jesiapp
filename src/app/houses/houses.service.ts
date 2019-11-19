import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HousesResourceService } from './data-access';
import { House } from './House';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  public constructor(private readonly resource: HousesResourceService) {}

  public listHouses(): Observable<House[]> {
    return this.resource.fetchHouses().pipe(map(House.NEW_BUNCH));
  }

  public getHouse(id: number): Observable<House> {
    return this.resource.fetchHouse(id).pipe(map(House.NEW));
  }
}

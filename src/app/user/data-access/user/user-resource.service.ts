import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserData } from './UserData';

@Injectable({
  providedIn: 'root',
})
export class UserResourceService {
  private resourcePath = '/api/users';

  public constructor(private readonly httpClient: HttpClient) {}

  public user(userId: string): Observable<UserData> {
    const URL = `${this.resourcePath}/${userId}`;
    return this.httpClient.get<UserData>(URL);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from './UserModel';
import { UserShape } from './UserShape';

@Injectable({
  providedIn: 'root',
})
export class UserResourceService {
  private resourcePath = '/api/users';

  public constructor(private readonly httpClient: HttpClient) {}

  public user(userId: number): Observable<UserShape> {
    return this.requestUser(userId).pipe(map(UserShape.NEW));
  }

  public updateUser(userId: number, data: UserModel): Observable<UserShape> {
    return this.patchUser(userId, data).pipe(map(UserShape.NEW));
  }

  private requestUser(userId: number): Observable<UserModel> {
    const URL = `${this.resourcePath}/${userId}`;
    return this.httpClient.get<UserModel>(URL);
  }

  private patchUser(userId: number, data: UserModel): Observable<UserModel> {
    const URL = `${this.resourcePath}/${userId}`;
    return this.httpClient.patch<UserModel>(URL, data);
  }
}

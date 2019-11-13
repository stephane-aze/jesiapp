import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuth } from './UserAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private resourcePath = '/api/auth';

  public constructor(private readonly httpClient: HttpClient) {}

  public authenticate(login: string, password: string): Observable<UserAuth> {
    const body = { login, password };
    return this.httpClient.post<UserAuth>(this.resourcePath, body);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { AuthService } from './data-access/auth/auth.service';
import { UserResourceService } from './data-access/user/user-resource.service';
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authenticatedUser!: User;

  public constructor(private readonly auth: AuthService, private readonly resource: UserResourceService) {}

  public get currentUser() {
    return this.authenticatedUser;
  }

  public authenticate(login: string, password: string): Observable<User> {
    return this.auth.authenticate(login, password).pipe(
      switchMap(authData => this.resource.user(authData.userId)),
      map(User.NEW),
      tap(user => {
        this.authenticatedUser = user;
      }),
    );
  }

  public logout(): void {
    this.authenticatedUser = null;
  }
}

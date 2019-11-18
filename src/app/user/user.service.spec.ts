import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import mockUserShape from './__tests__/mock-user-shape';
import mockUser from './__tests__/mock-user';

import { AuthService } from './data-access/auth/auth.service';
import { UserResourceService } from './data-access/user/user-resource.service';
import { UserService } from './user.service';
import { User } from './User';

describe('UserService', () => {
  let service: UserService;
  let resource: UserResourceService;
  let auth: AuthService;

  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  beforeEach(() => {
    service = TestBed.get(UserService);
    resource = TestBed.get(UserResourceService);
    auth = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('authenticate', () => {
    test('calls auth and user service in sequence', fakeAsync(() => {
      jest.spyOn(auth, 'authenticate').mockReturnValueOnce(of({ userId: 1, token: 'foo' }));
      jest.spyOn(resource, 'user').mockReturnValueOnce(of(mockUserShape()));

      service.authenticate('foo', 'bar').subscribe(user => {
        expect(user).toMatchObject(mockUser());
      });

      expect(auth.authenticate).toHaveBeenCalledTimes(1);
      expect(auth.authenticate).toHaveBeenCalledWith('foo', 'bar');
      expect(resource.user).toHaveBeenCalledTimes(1);
      expect(resource.user).toHaveBeenCalledWith(1);
    }));

    test('sets the authenticated user prop', fakeAsync(() => {
      jest.spyOn(auth, 'authenticate').mockReturnValueOnce(of({ userId: 1, token: 'foo' }));
      jest.spyOn(resource, 'user').mockReturnValueOnce(of(mockUserShape()));

      expect(service.currentUser).toBeFalsy();

      service.authenticate('foo', 'bar').subscribe(user => {
        expect(user).toMatchObject(mockUser());
      });

      expect(service.currentUser).toBeTruthy();
      expect(service.currentUser).toBeInstanceOf(User);
      expect(service.currentUser).toMatchObject(mockUser());
    }));
  });
});

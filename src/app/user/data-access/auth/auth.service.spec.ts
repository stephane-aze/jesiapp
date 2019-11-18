import { fakeAsync } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserAuth } from './UserAuth';
import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';

describe('AuthService', () => {
  const testConfig = useHttpServiceTestSetup<AuthService>(AuthService);

  beforeEach(testConfig.init);
  afterEach(testConfig.teardown);

  it('should be created', () => {
    expect(testConfig.service).toBeTruthy();
  });

  describe('authenticate', () => {
    test('should call the /api/auth resource', fakeAsync(() => {
      const mockBody = {
        login: 'foo',
        password: 'bar',
      };

      const mockResponse: UserAuth = {
        userId: '1',
        token: 'FOOBAR',
      };

      testConfig.service.authenticate(mockBody.login, mockBody.password).subscribe(userAuth => {
        expect(userAuth.userId).toBe(mockResponse.userId);
        expect(userAuth.token).toBe(mockResponse.token);
      });

      const req = testConfig.httpTestingController.expectOne('/api/auth');
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
    }));
  });
});

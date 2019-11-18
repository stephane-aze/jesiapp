import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';
import mockUserModel from '../../__tests__/mock-user-model';
import { UserResourceService } from './user-resource.service';

describe('FetchUserService', () => {
  const testEnv = useHttpServiceTestSetup<UserResourceService>(UserResourceService);

  beforeEach(testEnv.init);
  afterEach(testEnv.teardown);

  it('should be created', () => {
    expect(testEnv.service).toBeTruthy();
  });

  describe('user', () => {
    test('requests user by id', () => {
      const expectedUri = '/api/users/1';

      testEnv.service.user(1).subscribe();

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush({});
    });

    test('returns the fetched data', () => {
      const expectedUri = '/api/users/1';
      const mockData = mockUserModel();

      testEnv.service.user(1).subscribe(data => {
        expect(data).toMatchObject(mockData);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });
  });
});

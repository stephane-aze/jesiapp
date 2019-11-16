import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';
import mockUserData from '../../__tests__/mock-user-data';
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
      const expectedUri = '/api/users/foo';

      testEnv.service.user('foo').subscribe();

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(null);
    });

    test('returns the fetched data', () => {
      const expectedUri = '/api/users/foo';
      const mockData = mockUserData();

      testEnv.service.user('foo').subscribe(data => {
        expect(data).toMatchObject(mockData);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { HousesResourceService } from '../houses-resource.service';
import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';
import mockHouseModel from '../../__tests__/mock-house-model';
import mockHouseShape from '../../__tests__/mock-house-shape';

describe('HousesResourceService', () => {
  const testEnv = useHttpServiceTestSetup<HousesResourceService>(HousesResourceService);

  beforeEach(testEnv.init);
  afterEach(testEnv.teardown);

  it('should be created', () => {
    expect(testEnv.service).toBeTruthy();
  });

  describe('fetchHouses', () => {
    test('requests characters', () => {
      const expectedUri = '/api/houses';

      testEnv.service.fetchHouses().subscribe();

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush([]);
    });

    test('returns the fetched instantiated to charachter shape', () => {
      const expectedUri = '/api/houses';
      const mockData = [mockHouseModel()];
      const expectedShapes = [mockHouseShape()];

      testEnv.service.fetchHouses().subscribe(data => {
        expect(data).toMatchObject(expectedShapes);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });

    test('requests an empty list when no data is fetched', () => {
      const expectedUri = '/api/houses';

      testEnv.service.fetchHouses().subscribe(data => {
        expect(data).toMatchObject([]);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(null);
    });
  });
});

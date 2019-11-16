import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';
import mockCharacterModel from '../../__tests__/mock-character-model';
import mockCharacterShape from '../../__tests__/mock-character-shape';
import { CharactersResourceService } from '../characters-resource.service';

describe('CharactersResourceService', () => {
  const testEnv = useHttpServiceTestSetup<CharactersResourceService>(CharactersResourceService);

  beforeEach(testEnv.init);
  afterEach(testEnv.teardown);

  it('should be created', () => {
    expect(testEnv.service).toBeTruthy();
  });

  describe('fetchCharacters', () => {
    test('requests characters', () => {
      const expectedUri = '/api/characters';

      testEnv.service.fetchCharacters().subscribe();

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush([]);
    });

    test('returns the fetched instantiated to charachter shape', () => {
      const expectedUri = '/api/characters';
      const mockData = [mockCharacterModel()];
      const expectedShapes = [mockCharacterShape()];

      testEnv.service.fetchCharacters().subscribe(data => {
        expect(data).toMatchObject(expectedShapes);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });

    test('requests an empty list when no data is fetched', () => {
      const expectedUri = '/api/characters';

      testEnv.service.fetchCharacters().subscribe(data => {
        expect(data).toMatchObject([]);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(null);
    });
  });
});

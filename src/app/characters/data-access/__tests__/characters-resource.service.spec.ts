import useHttpServiceTestSetup from 'src/test-setup/use-http-service-test-setup';
import mockCharacterModel from '../../__tests__/mock-character-model';
import mockCharacterShape from '../../__tests__/mock-character-shape';
import { CharactersResourceService } from '../characters-resource.service';
import { HttpParams } from '@angular/common/http';

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

    test('returns the fetched data instantiated to character shape', () => {
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

    test('when given params, adds them to http params object', () => {
      const expectedUri = '/api/characters?foo=bar';
      const mockData = [mockCharacterModel()];
      const expectedShapes = [mockCharacterShape()];

      testEnv.service.fetchCharacters({ foo: 'bar' }).subscribe(data => {
        expect(data).toMatchObject(expectedShapes);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });
  });

  describe('fetchCharacter', () => {
    test('requests character id 1', () => {
      const expectedUri = '/api/characters/1';

      testEnv.service.fetchCharacter(1).subscribe();

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush({});
    });

    test('returns the fetched data instantiated to character shape', () => {
      const expectedUri = '/api/characters/1';
      const mockData = mockCharacterModel();
      const expectedShape = mockCharacterShape();

      testEnv.service.fetchCharacter(1).subscribe(data => {
        expect(data).toMatchObject(expectedShape);
      });

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(mockData);
    });

    test('throws an error when no data is fetched', () => {
      const expectedUri = '/api/characters/1';

      testEnv.service.fetchCharacter(1).subscribe(
        () => {},
        (error: Error) => {
          expect(error.message).toBe('No data');
        },
      );

      const req = testEnv.httpTestingController.expectOne(expectedUri);
      req.flush(null);
    });
  });
});

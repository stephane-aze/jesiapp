import { TestBed, fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { ComponentTestEnv } from 'src/test-setup/ComponentTestEnv';
import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockCharacter from '../../__tests__/mock-character';

import { SharedModule } from 'src/app/shared/shared.module';
import { DataLoaderService } from 'src/app/shared/data-loader.service';
import { CharactersService } from '../../characters.service';
import { CharactersListComponent } from '../characters-list.component';
import { CharacterThumbnailComponent } from '../../character-thumbnail/character-thumbnail.component';
import { Character } from '../../Character';

describe('CharactersListComponent class', () => {
  let testEnv: ComponentTestEnv<CharactersListComponent>;

  beforeAll(() => {
    testEnv = useComponentTestSetup(CharactersListComponent, {
      declarations: [CharactersListComponent, CharacterThumbnailComponent],
      imports: [SharedModule],
      providers: [DataLoaderService],
    });
  });

  afterAll(() => {
    testEnv = null;
  });

  beforeEach(done => {
    return testEnv.init(done, () => {
      const charactersService: CharactersService = TestBed.get(CharactersService);
      const mockCharacters = of([mockCharacter()]);

      expect(testEnv.component.characters$).toBeFalsy();

      jest.spyOn(charactersService, 'listCharacters').mockReturnValueOnce(mockCharacters);
      jest.spyOn(testEnv.component['charactersLoaderService'], 'init'); // tslint:disable-line no-string-literal
    });
  });

  it('should create', () => {
    expect(testEnv.component).toBeTruthy();
  });

  describe('initCharactersLoader()', () => {
    test('inits the dataloader service and sets data stream in a public observable property', () => {
      const charactersService: CharactersService = TestBed.get(CharactersService);

      expect(charactersService.listCharacters).toHaveBeenCalledTimes(1);
      expect(testEnv.component['charactersLoaderService'].init).toHaveBeenCalledTimes(1); // tslint:disable-line no-string-literal
      expect(testEnv.component.characters$).toBeTruthy();
    });
  });

  describe('onFilter()', () => {
    test('uses the data loader to transform the stored values in a new stream of data', () => {
      jest
        .spyOn(testEnv.component['charactersLoaderService'], 'transform') // tslint:disable-line no-string-literal
        .mockImplementationOnce(cb => cb([]));

      testEnv.component.onFilter();
      expect(testEnv.component['charactersLoaderService'].transform).toHaveBeenCalledTimes(1); // tslint:disable-line no-string-literal
    });

    test('uses the input value to update the data stream', fakeAsync(() => {
      jest
        .spyOn(testEnv.component['charactersLoaderService'], 'transform') // tslint:disable-line no-string-literal
        .mockImplementationOnce(cb => cb([mockCharacter()]));

      testEnv.component.filterInput = 'foo';
      testEnv.component.onFilter();
      expect(testEnv.component['charactersLoaderService'].transform).toHaveBeenCalledTimes(1); // tslint:disable-line no-string-literal

      testEnv.component.characters$.subscribe(data => {
        expect(data).toMatchObject([]);
      });
    }));
  });

  describe('reset()', () => {
    test('resets both data loader and input value', fakeAsync(() => {
      testEnv.component.filterInput = 'foo';
      testEnv.component['charactersLoaderService'].load([]); // tslint:disable-line no-string-literal

      testEnv.component.reset();

      expect(testEnv.component.filterInput).toBe('');

      testEnv.component.characters$.subscribe(data => {
        expect(data).toMatchObject([mockCharacter()]);
      });
    }));
  });

  describe('onSelectCharacter()', () => {
    test('receives a model set to the public selectedCharacter property', () => {
      expect(testEnv.component.selectedCharacter).toBeFalsy();

      testEnv.component.onSelectCharacter(mockCharacter());

      expect(testEnv.component.selectedCharacter).toBeTruthy();
      expect(testEnv.component.selectedCharacter).toBeInstanceOf(Character);
      expect(testEnv.component.selectedCharacter).toMatchObject(mockCharacter());
    });
  });
});

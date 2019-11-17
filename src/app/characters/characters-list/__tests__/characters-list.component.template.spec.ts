import { TestBed, fakeAsync } from '@angular/core/testing';
import { of, EMPTY } from 'rxjs';
import cases from 'jest-in-case';

import { ComponentTestEnv } from 'src/test-setup/ComponentTestEnv';
import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockCharacter from '../../__tests__/mock-character';

import { SharedModule } from 'src/app/shared/shared.module';
import { DataLoaderService } from 'src/app/shared/data-loader.service';
import { CharactersService } from '../../characters.service';
import { CharactersListComponent } from '../characters-list.component';
import { CharacterThumbnailComponent } from '../../character-thumbnail/character-thumbnail.component';

describe('CharactersListComponent', () => {
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
      jest.spyOn(charactersService, 'listCharacters').mockReturnValueOnce(mockCharacters);
    });
  });

  test('renders', () => {
    expect(testEnv.element).toBeTruthy();
  });

  test('when data stream has not yet emitted values, then displays loader', fakeAsync(() => {
    testEnv.setup(() => {
      const charactersService: CharactersService = TestBed.get(CharactersService);
      jest.spyOn(charactersService, 'listCharacters').mockReturnValueOnce(EMPTY);
    });

    expect(testEnv.element.querySelector('jesi-loader')).toBeTruthy();
    expect(testEnv.getElementByTestId('display-characters')).toBeFalsy();
  }));

  test('when data stream has emitted values, then displays associated section', fakeAsync(() => {
    testEnv.setup(() => {
      const charactersService: CharactersService = TestBed.get(CharactersService);
      jest.spyOn(charactersService, 'listCharacters').mockReturnValueOnce(of([]));
    });

    testEnv.component.characters$.subscribe(() => {
      testEnv.fixture.detectChanges();

      expect(testEnv.element.querySelector('jesi-loader')).toBeFalsy();
      expect(testEnv.getElementByTestId('display-characters')).toBeTruthy();
    });
  }));

  cases(
    'when data stream has emitted a list of elements',
    ({ given: { list }, then: { displayedCount } }, done) => {
      testEnv.component.characters$ = of(list);

      testEnv.component.characters$.subscribe(() => {
        testEnv.fixture.detectChanges();

        expect(testEnv.element.querySelectorAll('jesi-character-thumbnail').length).toBe(displayedCount);
        done();
      });
    },
    {
      empty: {
        given: { list: [] },
        then: { displayedCount: 0 },
      },
      'one element': {
        given: { list: [mockCharacter()] },
        then: { displayedCount: 1 },
      },
      'several elements': {
        given: { list: [mockCharacter({ id: 1 }), mockCharacter({ id: 2 }), mockCharacter({ id: 3 })] },
        then: { displayedCount: 3 },
      },
    },
  );

  describe('filtering', () => {
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      inputElement = testEnv.getElementByTestId('filtering').querySelector('input');
    });

    test('uses the public property filterPlaceholder as placeholder', () => {
      expect(inputElement.placeholder).toBe(testEnv.component.filterPlaceholder);
    });

    test('uses the public property filterInput as ngModel', fakeAsync(() => {
      testEnv.component.filterInput = 'foo';
      testEnv.fixture.detectChanges();
      testEnv.fixture.whenStable().then(() => {
        expect(inputElement.value).toBe('foo');
      });
    }));

    test('when keyup is emitted, triggers the onFilter public method', () => {
      jest.spyOn(testEnv.component, 'onFilter').mockImplementationOnce(() => {});
      inputElement.value = 'foo';
      inputElement.dispatchEvent(new Event('keyup'));
      testEnv.fixture.detectChanges();

      expect(testEnv.component.onFilter).toHaveBeenCalledTimes(1);
    });

    test('when clear button is clicked, triggers the reset public method', () => {
      const button: HTMLElement = testEnv.getElementByTestId('filtering').querySelector('jesi-button');
      jest.spyOn(testEnv.component, 'reset').mockImplementationOnce(() => {});
      button.dispatchEvent(new Event('click'));
      testEnv.fixture.detectChanges();

      expect(testEnv.component.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('selected character', () => {
    test('when no value, does not display the section', () => {
      const selectedCharacterSection = testEnv.getDebugByTestId('selected-character');
      expect(testEnv.component.selectedCharacter).toBeFalsy();
      expect(selectedCharacterSection).toBeFalsy();
    });

    test('when a selected character is set, display the section with a thumbnail inside', fakeAsync(() => {
      testEnv.component.selectedCharacter = mockCharacter();
      testEnv.fixture.detectChanges();

      testEnv.fixture.whenStable().then(() => {
        const selectedCharacterSection = testEnv.getDebugByTestId('selected-character');
        expect(selectedCharacterSection).toBeTruthy();
        const children = selectedCharacterSection.nativeElement.querySelectorAll('jesi-character-thumbnail');
        expect(children.length).toBe(1);
      });
    }));

    test('when a selected character is set, passes its data to the thumbnail component', fakeAsync(() => {
      testEnv.component.selectedCharacter = mockCharacter();
      testEnv.fixture.detectChanges();

      testEnv.fixture.whenStable().then(() => {
        const child: CharacterThumbnailComponent = testEnv.getChild(CharacterThumbnailComponent).componentInstance;

        expect(child.character).toMatchObject(mockCharacter());
      });
    }));
  });
});

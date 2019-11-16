import { EventEmitter } from '@angular/core';

import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockCharacter from '../__tests__/mock-character';
import { CharacterThumbnailComponent } from './character-thumbnail.component';
import { Character } from '../Character';

describe('CharacterThumbnailComponent', () => {
  const testEnv = useComponentTestSetup<CharacterThumbnailComponent>(CharacterThumbnailComponent);

  beforeEach(testEnv.init);

  describe('init', () => {
    test('no input', () => {
      expect(testEnv.component).toBeTruthy();
      expect(testEnv.component.character).toBeFalsy();
    });

    test('character input set', () => {
      testEnv.setup(() => {
        testEnv.component.character = mockCharacter();
      });

      expect(testEnv.component).toBeTruthy();
      expect(testEnv.component.character).toBeTruthy();
      expect(testEnv.component.character).toBeInstanceOf(Character);
    });

    test('exposes an EventEmitter', () => {
      expect(testEnv.component.chose).toBeTruthy();
      expect(testEnv.component.chose).toBeInstanceOf(EventEmitter);
    });
  });

  describe('openCharacterDetails()', () => {
    test('emits the current character value', () => {
      const mock = mockCharacter();
      testEnv.setup(() => {
        testEnv.component.character = mock;
      });

      jest.spyOn(testEnv.component.chose, 'emit').mockImplementationOnce(() => {});

      testEnv.component.openCharacterDetails();

      expect(testEnv.component.chose.emit).toHaveBeenCalledTimes(1);
      expect(testEnv.component.chose.emit).toHaveBeenCalledWith(mock);
    });
  });
});

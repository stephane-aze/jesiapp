import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockCharacter from '../__tests__/mock-character';
import { CharacterCardComponent } from './character-card.component';
import { Character } from '../Character';

/* tslint:disable no-string-literal */
describe('CharacterCardComponent', () => {
  const testEnv = useComponentTestSetup<CharacterCardComponent>(CharacterCardComponent);

  beforeEach(done =>
    testEnv.init(done, () => {
      testEnv.component['character'] = mockCharacter();
    }),
  );

  describe('class', () => {
    it('should create', () => {
      expect(testEnv.component).toBeTruthy();
    });

    test('should have a character property', () => {
      expect(testEnv.component['character']).toBeTruthy();
    });
  });

  describe('template', () => {
    let character: Character;

    beforeEach(() => {
      character = mockCharacter();
    });

    test('displays the character name in a h3', () => {
      const h3 = testEnv.element.querySelector('section h3');
      expect(h3).toBeTruthy();
      expect(h3.textContent).toBe(character.name);
    });

    test('uses the imagePath of the character to display an img', () => {
      const img: HTMLImageElement = testEnv.element.querySelector('section aside img');
      expect(img).toBeTruthy();
      expect(img.src).toBe(character.imagePath);
    });

    test('uses the name of the character as an alternative value for the image', () => {
      const img: HTMLImageElement = testEnv.element.querySelector('section aside img');
      expect(img).toBeTruthy();
      expect(img.alt).toBe(character.name);
    });

    test('displays the title in the correct data element, below its own title', () => {
      const titleDt = testEnv.element.querySelectorAll('section dl dt').item(0);
      const titleDd = testEnv.element.querySelectorAll('section dl dd').item(0);

      expect(titleDt).toBeTruthy();
      expect(titleDt.textContent).toBe('Title');
      expect(titleDd).toBeTruthy();
      expect(titleDd.textContent).toBe(character.title);
    });

    test('displays the aliases as a single string in the correct data element, below its title', () => {
      testEnv.setup(() => {
        const aliasesCharacter = mockCharacter({ aliases: ['foo', 'bar', 'baz'] });
        testEnv.component['character'] = aliasesCharacter;
      });

      const aliasesDt = testEnv.element.querySelectorAll('section dl dt').item(1);
      const aliasesDd = testEnv.element.querySelectorAll('section dl dd').item(1);

      expect(aliasesDt).toBeTruthy();
      expect(aliasesDt.textContent).toBe('Aliases');
      expect(aliasesDd).toBeTruthy();
      expect(aliasesDd.textContent).toBe('foo, bar, baz');
    });

    test('does not display the aliases value dd if no aliases is provided', () => {
      testEnv.setup(() => {
        const noAliasesCharacter = mockCharacter({ aliases: [] });
        testEnv.component['character'] = noAliasesCharacter;
      });

      const dds = testEnv.element.querySelectorAll('section dl dd');

      expect(dds.length).toBe(1);
      expect(dds.item(0).textContent).toBe(character.title);
    });

    test('does not display the aliases title dt if no aliases are provided', () => {
      testEnv.setup(() => {
        const noAliasesCharacter = mockCharacter({ aliases: [] });
        testEnv.component['character'] = noAliasesCharacter;
      });

      const dts = testEnv.element.querySelectorAll('section dl dt');

      expect(dts.length).toBe(1);
      expect(dts.item(0).textContent).toBe('Title');
    });

    test('adds a star class to the section if the character has more than 3 aliases', () => {
      testEnv.setup(() => {
        const noAliasesCharacter = mockCharacter({ aliases: ['foo', 'bar', 'baz', 'bat'] });
        testEnv.component['character'] = noAliasesCharacter;
      });

      const section = testEnv.element.querySelector('section');
      expect(section).toBeTruthy();
      expect(section.classList).toContain('star');
    });

    test('does not add a star class to the section if the character has 3 or less aliases', () => {
      testEnv.setup(() => {
        const noAliasesCharacter = mockCharacter({ aliases: ['foo', 'bar', 'baz'] });
        testEnv.component['character'] = noAliasesCharacter;
      });

      const section = testEnv.element.querySelector('section');
      expect(section).toBeTruthy();
      expect(section.classList).not.toContain('star');
    });
  });
});
/* tslint:enable no-string-literal */

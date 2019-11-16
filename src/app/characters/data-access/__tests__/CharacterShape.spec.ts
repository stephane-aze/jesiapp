import cases from 'jest-in-case';
import mockCharacterModel from '../../__tests__/mock-character-model';
import { CharacterShape } from '../CharacterShape';

describe('CharacterShape', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(CharacterShape);
      });
    },
    {
      default: {
        instances: [new CharacterShape(mockCharacterModel())],
      },
      'static instantiation': {
        instances: [CharacterShape.NEW(mockCharacterModel())],
      },
      'static group instantiation': {
        instances: CharacterShape.NEW_BUNCH([mockCharacterModel()]),
      },
    },
  );

  cases(
    'nameStartsWith',
    ({ given: { characterTitles = [], characterAliases = [] }, then: { displayTitle } }) => {
      const model = mockCharacterModel({ titles: characterTitles, aliases: characterAliases });

      const characterShape = new CharacterShape(model);
      expect(characterShape.displayTitle).toBe(displayTitle);
    },
    {
      'with titles, use first title': {
        given: { characterTitles: ['foo'], characterAliases: ['bar'] },
        then: { displayTitle: 'foo' },
      },
      'with no titles but aliases, use first alias': {
        given: { characterTitles: [], characterAliases: ['bar'] },
        then: { displayTitle: 'bar' },
      },
      'with no titles nor aliases, use default string': {
        given: { characterTitles: [], characterAliases: [] },
        then: { displayTitle: 'No Title' },
      },
    },
  );
});

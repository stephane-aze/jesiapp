import cases from 'jest-in-case';

import mockCharacterShape from './mock-character-shape';
import { Character } from '../Character';

describe('Character', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(Character);
      });
    },
    {
      default: {
        instances: [new Character(1, 'foo', 'bar', 'baz', 1, ['Foo'], 'foobar')],
      },
      'static instantiation': {
        instances: [Character.NEW(mockCharacterShape())],
      },
      'static group instantiation': {
        instances: Character.NEW_BUNCH([mockCharacterShape()]),
      },
    },
  );

  cases(
    'nameStartsWith',
    ({ given: { characterName }, when: { proposal }, then: { result } }) => {
      const character = new Character(1, characterName, 'bar', 'baz', 1, [], 'foobar');
      expect(character.nameStartsWith(proposal)).toBe(result);
    },
    {
      default: {
        given: { characterName: 'foo' },
        when: { proposal: 'f' },
        then: { result: true },
      },
      'exact match': {
        given: { characterName: 'foo' },
        when: { proposal: 'foo' },
        then: { result: true },
      },
      'case insensitive': {
        given: { characterName: 'Foo' },
        when: { proposal: 'fo' },
        then: { result: true },
      },
      'match inside': {
        given: { characterName: 'Foo' },
        when: { proposal: 'oo' },
        then: { result: false },
      },
      'name undefined': {
        given: { characterName: null },
        when: { proposal: 'foo' },
        then: { result: false },
      },
      'proposal undefined': {
        given: { characterName: 'foo' },
        when: { proposal: null },
        then: { result: true },
      },
    },
  );
});

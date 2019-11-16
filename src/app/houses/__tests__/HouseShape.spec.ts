import cases from 'jest-in-case';

import mockHouseShape from './mock-house-shape';
import { House } from '../House';

describe('House', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(House);
      });
    },
    {
      default: {
        instances: [new House(1, 'name', 'region', 'image/path')],
      },
      'static instantiation': {
        instances: [House.NEW(mockHouseShape())],
      },
      'static group instantiation': {
        instances: House.NEW_BUNCH([mockHouseShape()]),
      },
    },
  );
});

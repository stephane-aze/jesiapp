import cases from 'jest-in-case';

import { UserShape } from '../data-access/user/UserShape';
import mockUserModel from './mock-user-model';

describe('UserShape', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(UserShape);
      });
    },
    {
      default: {
        instances: [new UserShape(mockUserModel())],
      },
      'static instantiation': {
        instances: [UserShape.NEW(mockUserModel())],
      },
      'static group instantiation': {
        instances: UserShape.NEW_BUNCH([mockUserModel()]),
      },
    },
  );
});

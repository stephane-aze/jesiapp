import cases from 'jest-in-case';
import { User } from '../User';
import mockUserShape from './mock-user-shape';

describe('User', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(User);
      });
    },
    {
      default: {
        instances: [new User(1, 'firstName', null, null)],
      },
      'static instantiation': {
        instances: [User.NEW(mockUserShape())],
      },
      'static group instantiation': {
        instances: User.NEW_BUNCH([mockUserShape()]),
      },
    },
  );
});

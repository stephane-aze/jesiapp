import cases from 'jest-in-case';
import mockHouseModel from '../../__tests__/mock-house-model';
import { HouseShape } from '../HouseShape';

describe('HouseShape', () => {
  cases(
    'instanciation',
    ({ instances }) => {
      instances.forEach(instance => {
        expect(instance).toBeTruthy();
        expect(instance).toBeInstanceOf(HouseShape);
      });
    },
    {
      default: {
        instances: [new HouseShape(mockHouseModel())],
      },
      'static instantiation': {
        instances: [HouseShape.NEW(mockHouseModel())],
      },
      'static group instantiation': {
        instances: HouseShape.NEW_BUNCH([mockHouseModel()]),
      },
    },
  );
});

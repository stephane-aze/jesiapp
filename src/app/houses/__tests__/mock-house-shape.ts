import mockHouseModel from './mock-house-model';
import { HouseShape } from '../data-access/HouseShape';

export default (data = {}) => HouseShape.NEW(mockHouseModel(data));

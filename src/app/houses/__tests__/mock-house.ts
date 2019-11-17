import mockHouseShape from './mock-house-shape';
import { House } from '../House';

export default (data = {}) => House.NEW(mockHouseShape(data));

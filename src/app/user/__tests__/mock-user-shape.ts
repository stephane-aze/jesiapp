import mockUserData from './mock-user-data';
import { UserShape } from '../data-access/user/UserShape';

export default (data = {}) => UserShape.NEW(mockUserData(data));

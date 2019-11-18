import mockUserModel from './mock-user-model';
import { UserShape } from '../data-access/user/UserShape';

export default (data = {}) => UserShape.NEW(mockUserModel(data));

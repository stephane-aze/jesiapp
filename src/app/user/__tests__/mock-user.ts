import mockUserShape from './mock-user-shape';
import { User } from '../User';

export default (data = {}) => User.NEW(mockUserShape(data));

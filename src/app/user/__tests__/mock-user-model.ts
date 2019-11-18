import { UserModel } from '../data-access/user/UserModel';

export default (data = {}): UserModel => ({
  id: 1,
  login: 'gmartin',
  password: 'martin',
  firstName: 'George',
  lastName: 'Martin',
  email: 'george.r.r@martin.com',
  favoriteCharacter: null,
  favoriteHouse: null,
  ...data,
});

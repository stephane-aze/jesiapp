import { UserShape } from './data-access/user/UserShape';

export class User {
  public constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly favoriteCharacter: number,
    public readonly favoriteHouse: number,
  ) {}

  public static NEW(data: UserShape): User {
    return new User(data.id, data.firstName, data.favoriteCharacter, data.favoriteHouse);
  }

  public static NEW_BUNCH(data: UserShape[]): User[] {
    return data.map(User.NEW);
  }
}

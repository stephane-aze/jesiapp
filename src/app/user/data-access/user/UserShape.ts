import { UserModel } from './UserModel';

export class UserShape {
  public id!: number;
  public login!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public favoriteCharacter!: number;
  public favoriteHouse!: number;

  public constructor(data: UserModel) {
    this.id = data.id;
    this.login = data.login;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.favoriteCharacter = data.favoriteCharacter;
    this.favoriteHouse = data.favoriteHouse;
  }

  public static NEW(data: UserModel): UserShape {
    return new UserShape(data);
  }

  public static NEW_BUNCH(data: UserModel[]): UserShape[] {
    return data.map(UserShape.NEW);
  }
}

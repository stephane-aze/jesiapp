import { CharacterShape } from './data-access/CharacterShape';

export class Character {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly title: string,
    public readonly imagePath: string,
  ) {}

  public static NEW(data: CharacterShape): Character {
    return new Character(data.id, data.name, data.displayTitle, data.imagePath);
  }

  public static NEW_BUNCH(data: CharacterShape[]): Character[] {
    return data.map(Character.NEW);
  }

  public nameStartsWith(proposal: string): boolean {
    const normalizedName = (this.name || '').toLowerCase();
    const normalizedTest = (proposal || '').toLowerCase();
    return normalizedName.startsWith(normalizedTest);
  }
}

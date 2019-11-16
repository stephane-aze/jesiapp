import { HouseShape } from './data-access/HouseShape';

export class House {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly region: string,
    public readonly imagePath: string,
  ) {}

  public static NEW(data: HouseShape): House {
    return new House(data.id, data.name, data.region, data.imagePath);
  }

  public static NEW_BUNCH(data: HouseShape[]): House[] {
    return data.map(House.NEW);
  }
}

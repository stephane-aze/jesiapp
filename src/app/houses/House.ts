import { HouseShape } from './data-access/HouseShape';

export class House {
  public readonly id!: number;
  public readonly name!: string;
  public readonly region!: string;
  public readonly coatOfArms!: string;
  public readonly words!: string;
  public readonly seat!: string;
  public readonly imagePath!: string;

  public constructor(data: HouseShape) {
    this.id = data.id;
    this.name = data.name;
    this.region = data.region;
    this.coatOfArms = data.coatOfArms;
    this.words = data.words;
    this.seat = data.seat;
    this.imagePath = data.imagePath;
  }

  public static NEW(data: HouseShape): House {
    return new House(data);
  }

  public static NEW_BUNCH(data: HouseShape[]): House[] {
    return data.map(House.NEW);
  }
}

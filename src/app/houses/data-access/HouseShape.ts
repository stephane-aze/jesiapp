import { HouseModel } from './HouseModel';

export class HouseShape {
  public id!: number;
  public name!: string;
  public region!: string;
  public coatOfArms!: string;
  public words!: string;
  public seat!: string;
  public imagePath!: string;

  public constructor(data: HouseModel) {
    this.id = data.id;
    this.name = data.name;
    this.region = data.region;
    this.coatOfArms = data.coatOfArms;
    this.words = data.words;
    this.seat = data.seat;
    this.imagePath = data.imagePath;
  }

  public static NEW(data: HouseModel): HouseShape {
    return new HouseShape(data);
  }

  public static NEW_BUNCH(data: HouseModel[]): HouseShape[] {
    return data.map(HouseShape.NEW);
  }
}

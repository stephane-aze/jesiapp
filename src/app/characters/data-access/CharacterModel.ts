export interface CharacterModel {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  titles: string[];
  aliases: string[];
  houseId: number;
  playedBy: string;
  imagePath: string;
}

import { CharacterModel } from '../data-access/CharacterModel';

export default (data: any = {}): CharacterModel => ({
  id: 27,
  name: 'Tywin Lannister',
  gender: 'Male',
  titles: [
    'Lord of Casterly Rock',
    'Shield of Lannisport',
    'Warden of the West',
    'Hand of the King',
    'Savior of the City',
  ],
  aliases: ['The Lion of Lannister', 'The Old Lion', 'The Great Lion of the Rock'],
  houseId: 229,
  playedBy: 'Charles Dance',
  imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Tywin_Lannister_Profile_Charles_Dance.jpg',
  ...data,
});

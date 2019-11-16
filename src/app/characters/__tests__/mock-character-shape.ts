import { CharacterShape } from '../data-access/CharacterShape';
import mockCharacterModel from './mock-character-model';

export default () => new CharacterShape(mockCharacterModel());

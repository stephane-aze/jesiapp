import { Character } from '../Character';
import mockCharacterShape from './mock-character-shape';

export default (data = {}) => Character.NEW(mockCharacterShape(data));

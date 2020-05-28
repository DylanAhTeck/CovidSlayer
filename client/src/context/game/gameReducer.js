import {
  CREATE_GAME,
  ATTACK,
  POWER_ATTACK,
  HEALING_POTION,
  SURRENDER,
  GAME_ERROR
} from '../types';
import { access } from 'fs';

export default (state, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        ...action.payload,
        game: action.payload.game
      };
    case ATTACK:
    case POWER_ATTACK:
    case SURRENDER:
    case HEALING_POTION:
      return {
        ...state,
        ...action.payload,
        comm: [action.payload.comm, ...state.commentary]
      };

    default:
      return state;
  }
};

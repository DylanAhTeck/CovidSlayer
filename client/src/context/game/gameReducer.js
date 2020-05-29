import {
  CREATE_GAME,
  ATTACK,
  POWER_ATTACK,
  HEALING_POTION,
  SURRENDER,
  LOAD_GAME,
  GAME_ERROR,
  CLEAR_GAME
} from '../types';
import { access } from 'fs';

export default (state, action) => {
  switch (action.type) {
    case CREATE_GAME:
    case LOAD_GAME:
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
        game: action.payload.game,
        commentary: [action.payload.comm, ...state.commentary]
      };
    case CLEAR_GAME:
      return {
        ...state,
        game: null,
        commentary: [],
        userhealth: '100',
        covidhealth: '100'
      };

    default:
      return state;
  }
};

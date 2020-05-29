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

export default (state, action) => {
  switch (action.type) {
    case CREATE_GAME:
    case LOAD_GAME:
      return {
        ...state,
        ...action.payload,
        game: action.payload.game,
        game_end: false
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
    case GAME_ERROR:
      return {
        ...state,
        game: null,
        commentary: [],
        userhealth: '100',
        covidhealth: '100',
        err: 'Game error occured'
      };

    default:
      return state;
  }
};

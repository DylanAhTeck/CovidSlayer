import React, { useReducer } from 'react';
import axios from 'axios';
import GameContext from './gameContext';
import GameReducer from './gameReducer';

import {
  CREATE_GAME,
  ATTACK,
  POWER_ATTACK,
  HEALING_POTION,
  SURRENDER,
  GAME_ERROR,
  LOAD_GAME
} from '../types';

const GameState = props => {
  const initialState = {
    userhealth: '100',
    covidhealth: '100',
    actions: [
      {
        action: 'Attack',
        id: 0
      },
      {
        action: 'Power Attack',
        id: 1
      },
      {
        action: 'Healing Potion',
        id: 2
      },
      {
        action: 'Surrender',
        id: 3
      }
    ],
    commentary: [],
    game: null,
    user: null,
    error: null
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // Create Game
  const createGame = async user => {
    try {
      const res = await axios.post(
        '/api/v1/game/creategame',
        {
          user
        },
        config
      );
      dispatch({
        type: CREATE_GAME,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Attack
  const attack = async game => {
    try {
      const res = await axios.post('/api/v1/game/attack', { game }, config);
      dispatch({
        type: ATTACK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Power attack
  const powerattack = async game => {
    try {
      const res = await axios.post(
        '/api/v1/game/powerattack',
        { game },
        config
      );
      dispatch({
        type: POWER_ATTACK,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Healing potion
  const healingpotion = async game => {
    try {
      const res = await axios.post(
        '/api/v1/game/healingpotion',
        { game },
        config
      );
      dispatch({
        type: HEALING_POTION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Surrender
  const surrender = async game => {
    try {
      const res = await axios.post('/api/v1/game/surrender', { game }, config);
      dispatch({
        type: SURRENDER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  // loadGame
  const loadGame = async user => {
    try {
      const res = await axios.get('/api/v1/game/getgame', config);
      dispatch({
        type: LOAD_GAME,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GAME_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <GameContext.Provider
      value={{
        userhealth: state.userhealth,
        covidhealth: state.covidhealth,
        error: state.error,
        actions: state.actions,
        game: state.game,
        commentary: state.commentary,
        createGame,
        attack,
        powerattack,
        healingpotion,
        surrender,
        loadGame
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;

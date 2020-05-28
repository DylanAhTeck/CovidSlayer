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
  GAME_ERROR
} from '../types';

const GameState = props => {
  const initialState = {
    userhealth: '0',
    covidhealth: '0',
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
    error: null
  };

  const [state, dispatch] = useReducer(GameReducer, initialState);

  // Create Game
  const createGame = async () => {
    try {
      const res = await axios.post('/api/v1/game/creategame');
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
  const attack = async () => {
    try {
      const res = await axios.post('/api/v1/game/attack');
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
  const powerattack = async () => {
    try {
      const res = await axios.post('/api/v1/game/powerattack');
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

  // Power attack
  const healingpotion = async () => {
    try {
      const res = await axios.post('/api/v1/game/healingpotion');
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
  const surrender = async () => {
    try {
      const res = await axios.post('/api/v1/game/surrender');
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

  return (
    <GameContext.Provider
      value={{
        userhealth: state.userhealth,
        covidhealth: state.covidhealth,
        error: state.error,
        actions: state.actions,
        attack,
        powerattack,
        healingpotion,
        surrender
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;

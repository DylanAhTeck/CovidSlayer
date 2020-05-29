import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import GameContext from '../../context/game/gameContext';
import Button from '../game/Button';

const Home = props => {
  const gameContext = useContext(GameContext);
  const authContext = useContext(AuthContext);

  const { loadUser, user } = authContext;
  const { createGame } = gameContext;

  useEffect(() => {
    loadUser();
    //props.history.push('/game');
  }, []);

  const startGame = () => {
    createGame(user);
    props.history.push('/game');
  };

  return (
    <div className='card bg-light large'>
      <div>
        <h1 className='text-center'>
          Welcome to <span className='text-primary'>COVID Slayer!</span>
        </h1>
      </div>
      <div className='text-center'>
        <button type='button' className='btn btn-primary' onClick={startGame}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default Home;

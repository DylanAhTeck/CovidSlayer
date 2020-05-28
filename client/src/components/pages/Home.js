import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Button from '../game/Button';

const Home = props => {
  useEffect(() => {
    //
    //props.history.push('/game');
  }, []);

  const startGame = () => {
    props.history.push('/game');
  };

  return (
    <div className='card bg-light large'>
      <div>
        <h1 className='text-center'>
          Welcome to <span className='text-primary'>COVID Slayer!</span>
        </h1>
      </div>
      <div class='text-center'>
        <button type='button' class='btn btn-primary' onClick={startGame}>
          Play
        </button>
      </div>
    </div>
  );
};

export default Home;

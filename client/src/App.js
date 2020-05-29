import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Game from './components/pages/Game';

import AuthState from './context/auth/AuthState';
import GameState from './context/game/GameState';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GameState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute exact path='/game' component={Game} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </GameState>
    </AuthState>
  );
};

export default App;

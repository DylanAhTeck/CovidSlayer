import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const authContext = useContext(AuthContext);

  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    avatar: '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      clearErrors();
      return alert('Error: Invalid Credentials');
    } // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { avatar, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    loginUser({ avatar, password });

    console.log('Login submit');
  };
  return (
    <div>
      <h1>
        Account <span className='text-primary'>Login </span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='avatar'>Avatar</label>
          <input
            type='text'
            name='avatar'
            value={avatar}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;

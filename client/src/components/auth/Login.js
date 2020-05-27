import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    avatar: '',
    password: ''
  });

  const { avatar, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Register submit');
  };
  return (
    <div>
      <h1>
        Account <span className='text-primary'>Login </span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='avatar'>Avatar</label>
          <input type='text' name='avatar' value={avatar} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
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

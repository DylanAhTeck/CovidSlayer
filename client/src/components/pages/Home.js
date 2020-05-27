import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

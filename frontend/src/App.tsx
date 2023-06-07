import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AppRouter from './modules/AppRouter';
import NavBar from './modules/NavBar';
import Footer from './modules/Footer';
import './themes.css';

function App() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      {isLoggedIn && <NavBar />}
      <AppRouter />
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;

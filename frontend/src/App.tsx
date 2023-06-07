import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AppRouter from './modules/AppRouter';
import NavBar from './modules/NavBar';
import Footer from './modules/Footer';
import './themes.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const isLoginPage = location.pathname === '/Login';
  const isSignUpPage = location.pathname === '/SignUp';

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage && !isSignUpPage) {
      navigate('/Login');
    }
  }, [navigate, isLoggedIn, isLoginPage, isSignUpPage]);

  const showNavBarAndFooter = isLoggedIn || isLoginPage || isSignUpPage;

  return (
    <>
      {isLoggedIn && <NavBar />}
      <AppRouter />
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;

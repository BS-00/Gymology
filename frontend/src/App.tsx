import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from 'react';
import AppRouter from './modules/AppRouter';
import NavBar from './modules/NavBar';
import Footer from './modules/Footer';
import './themes.css';

function App() {
  return (
    <>
      <NavBar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;

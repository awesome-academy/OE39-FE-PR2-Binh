import React from 'react';
import Footer from './components/Partials/Footer/Footer';
import Header from './components/Partials/Header/Header';

function App(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default App;

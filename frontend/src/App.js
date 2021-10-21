import React, { useEffect, useState } from 'react';
import Footer from './components/Partials/Footer/Footer';
import Header from './components/Partials/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, false);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function scrollHandler() {
    if (window.pageYOffset >= 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  return (
    <>
      <Header />
      {props.children}
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <button
        id="scroll-top"
        className={visible ? 'show' : ''}
        title="Back to top"
        onClick={scrollToTop}
      >
        <i className="las la-arrow-up"></i>
      </button>
    </>
  );
}

export default App;

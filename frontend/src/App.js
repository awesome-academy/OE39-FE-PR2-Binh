import './App.css';
import Product from './components/Features/Product';
import Footer from './components/Partials/Footer/Footer';
import Header from './components/Partials/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="container mt-4 mb-4">
        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index} className="col-lg-3 col-md-4 col-xs-6">
              <Product />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

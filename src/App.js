import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Home from './pages/Home';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsInfos from './pages/ProductsInfos';
import Cart from './pages/Cart';
import './styleSheets/Layout.css'
import './styleSheets/Products.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/productsinfos/:productid' exact element={<ProductsInfos/>} />
          <Route path='/' exact element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

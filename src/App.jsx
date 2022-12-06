import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './pages/HomePage/HomePage';
import Search from './pages/SearchPage/SearchPage';
import Profile from './pages/ProfilePage/ProfilePage';
import Menu from './pages/MenuPage/MenuPage';
import Register from './pages/RegisterPage/RegisterPage';
import Login from './pages/LoginPage/LoginPage';
import Catalog from './pages/user/CatalogPage/CatalogPage';
import CreateProduct from './pages/user/CreateProduct/CreateProduct';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/catalog' element={<Catalog />} />
        <Route path='/user/CreateProduct' element={<CreateProduct />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;


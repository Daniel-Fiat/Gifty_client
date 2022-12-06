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
import WishList from './pages/user/WishListPage/WishListPage';
import CreateProduct from './pages/user/CreateProduct/CreateProductPage';
import EditProduct from './pages/user/EditProduct/EditProductPage';
import { AuthContext } from './context/auth.context';
import { useContext } from 'react';
// windows.location?
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile' element={user ? <Profile /> : <Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/catalog' element={<Catalog />} />
        <Route path='/user/wishList' element={<WishList />} />
        <Route path='/user/CreateProduct' element={<CreateProduct />} />
        <Route path='/user/UpdateProduct/:id' element={<EditProduct />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;


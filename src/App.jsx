import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './pages/HomePage/HomePage';
import Search from './pages/SearchPage/SearchPage';
import Profile from './pages/ProfilePage/ProfilePage';
import Menu from './pages/MenuPage/MenuPage';
import Register from './pages/RegisterPage/RegisterPage';
import RegisterLoginPage from './pages/RegisterLoginPage/RegisterLoginPage';
import Login from './pages/LoginPage/LoginPage';
import Catalog from './pages/user/CatalogPage/CatalogPage';
import WishList from './pages/user/WishListPage/WishListPage';
import CreateProduct from './pages/user/CreateProduct/CreateProductPage';
import EditProduct from './pages/user/EditProduct/EditProductPage';
import ProductDetail from './pages/Products/ProductDetails/ProductDetailsPage';
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
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/profile' element={user ? <Profile /> : <RegisterLoginPage />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/catalog' element={user ? <Catalog /> : <RegisterLoginPage />} />
        <Route path='/user/wishList' element={user ? <WishList /> : <RegisterLoginPage />} />
        <Route path='/user/CreateProduct' element={<CreateProduct />} />
        <Route path='/user/UpdateProduct/:id' element={<EditProduct />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;


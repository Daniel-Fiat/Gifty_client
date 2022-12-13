import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Home from './pages/HomePage/HomePage';
import Search from './pages/SearchPage/SearchPage';
import Profile from './pages/user/ProfilePage/ProfilePage';
import Menu from './pages/MenuPage/MenuPage';
import Register from './pages/RegisterPage/RegisterPage';
import RegisterLogin from './pages/RegisterLoginPage/RegisterLoginPage';
import Login from './pages/LoginPage/LoginPage';
import Catalog from './pages/user/CatalogPage/CatalogPage';
import Mygifts from './pages/user/Mygifts/MygiftsPage';
import WishList from './pages/user/WishListPage/WishListPage';
import CreateProduct from './pages/user/CreateProduct/CreateProductPage';
import EditProduct from './pages/user/EditProduct/EditProductPage';
import ProductDetail from './pages/Products/ProductDetails/ProductDetailsPage';
import GiftyProduct from './pages/Products/giftyProductPage/giftyProductPage';
import CategoryChance from './pages/CategoryChancePage/CategoryChancePage';
import MyShop from './pages/user/MyShop/MyShopPage';

import { AuthContext } from './context/auth.context';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import IsPrivate from './components/Routes/IsPrivate';
// windows.location?
function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/:type' element={<CategoryChance />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/gifty/:id' element={<IsPrivate> <GiftyProduct /> </IsPrivate>} />
          <Route path='/profile' element={<IsPrivate> <Profile /> </IsPrivate>} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registerLogin' element={<RegisterLogin />} />
          <Route path='/user/catalog' element={<IsPrivate> <Catalog /> </IsPrivate>} />
          <Route path='/user/mygifts' element={<IsPrivate> <Mygifts /> </IsPrivate>} />
          <Route path='/user/wishList' element={<IsPrivate> <WishList /> </IsPrivate>} />
          < Route path='/user/shop' element={<IsPrivate> <MyShop /> </IsPrivate>} />
          <Route path='/user/CreateProduct' element={<CreateProduct />} />
          <Route path='/user/UpdateProduct/:id' element={<EditProduct />} />
        </Routes>
      </Container>
      <div className='margin-bottom-app'></div>
      <NavBar />
    </div>
  );
}

export default App;


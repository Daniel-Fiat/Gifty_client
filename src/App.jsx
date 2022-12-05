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


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;


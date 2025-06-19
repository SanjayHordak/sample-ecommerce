import './App.css'
import Homepage from './components/homepage'
import Loginpage from './components/login'
import Navigationbar from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Regpage from './components/register';
import Userhome from './components/user/userpage';
import Adminhome from './components/admin/admin';
import Adminviewuser from './components/admin/adminviewuser';
import Editpro from './components/user/editprofile';
import Profileuser from './components/user/profile';
import Adminaddproducts from './components/admin/adminaddproduct';
import Adminviewproduct from './components/admin/adminviewproduct';
import Cart from './components/user/viewcart';
import Myorder from './components/user/myorder';
import Adminvieworder from './components/admin/adminvieworder';

function App() {
  return (
    <>
    <Navigationbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/log' element={<Loginpage/>}/>
      <Route path='/reg' element={<Regpage/>}/>
      <Route path='/userhome' element={<Userhome/>}/>
      <Route path='/editprofile/:id' element={<Editpro/>}/>
      <Route path='/profile' element={<Profileuser/>}/>
      <Route path='/adminhome' element={<Adminhome/>}/>
      <Route path='/adminviewuser' element={<Adminviewuser/>}/>
      <Route path='/adminaddproduct' element={<Adminaddproducts/>}/>
      <Route path='/adminviewproduct' element={<Adminviewproduct/>}/>
      <Route path='/viewcart' element={<Cart/>}/>
      <Route path='/vieworder' element={<Myorder/>}/>
      <Route path='/fetchorder' element={<Adminvieworder/>}/>
    </Routes>
     </>
  )
}

export default App

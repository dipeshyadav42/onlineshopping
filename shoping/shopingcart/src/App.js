import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Registration from './Registration';
import Header from './Header';
import Login from './Login';
import { Contextapi } from './Contextapi';
import { useState } from 'react';
import Dashboard from './dashboard';
import Adminproducts from './Adminproducts';
import Adminproductadd from './Adminproductadd';
import Adminproductupdate from './Adminproductupdate';
import Products from './products';
import Cart from './Cart';
import Details from './productdetails';
import Footer from './footer';



function App() {
  const[loginname,setLoginname]=useState(window.localStorage.getItem('loginname'))
  const[cart,setCart]=useState('')
  window.localStorage.setItem('cart',JSON.stringify(cart))  


  return ( 
    <>
    <Router>
      <Contextapi.Provider value={{loginname,setLoginname,cart,setCart}}>

      <Header/>

      <Routes>
        <Route path='/reg' element={<Registration/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/adminproducts' element={<Adminproducts/>}></Route>
        <Route path='/adminaddproduct' element={<Adminproductadd/>}></Route>
        <Route path='/adminaddproductupdate/:id' element={<Adminproductupdate/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/moredetails' element={<Details/>}></Route>
    



      </Routes>
      
      </Contextapi.Provider>
      {/* <Footer/> */}
    </Router>
    </>
   );
}

export default App;
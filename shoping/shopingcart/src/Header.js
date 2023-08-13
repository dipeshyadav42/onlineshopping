import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Contextapi } from './Contextapi';


function Header() {
  const navigate=useNavigate()
  const{loginname,setLoginname,cart}=useContext(Contextapi)
  function handlelogout(e){
    window.localStorage.removeItem('loginname')
    setLoginname(window.localStorage.getItem('loginname'))
    navigate('/')
  }
    return ( 
        <section id="header">
            <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
            <nav className="navbar navbar-expand-lg navbar-light" style={{background:'#6C3483'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/products">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {loginname?
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products" style={{color:'white'}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products" style={{color:'black'}}>Welcome  {loginname}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" style={{color:'white'}}>cart-{!cart.totalItems?0:cart.totalItems}</Link>
        </li>
       
      
     
      </ul>
      :
      <h2></h2>
} 

{loginname?
          <button onClick={(e)=>{handlelogout(e)}} className='btn btn-danger'>Logout</button>
        
           :
           <h2></h2>
     } 
    
    </div>
  </div>
</nav>
            </div>
            </div>
            </div>
  
        </section>
     );
}

export default Header;
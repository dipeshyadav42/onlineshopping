import { useContext, useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import { Contextapi } from "./Contextapi";




function Login() {
    const{setLoginname}=useContext(Contextapi)
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[message,setMessage]=useState('')
    let navigate=useNavigate()
    
    function handleform(e){
        e.preventDefault()
        const data={username,password}
        fetch('/api/logincheck',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
                window.localStorage.setItem('loginname',data.apiData.username)
                setLoginname(window.localStorage.getItem('loginname'))
                if(data.apiData.username==='admin'){
                    navigate('/dashboard')
                }else{
                    navigate('/products')
                }
            }else{
                setMessage(data.message)
            }
        })
    }
    return ( 
        <section id='reg'>
        <div className='container'>
        <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
            <h2>LOGIN HERE   <i className="bi bi-box-arrow-in-right"></i></h2>
            <h6 style={{color:'red'}}>{message}</h6>
            <form onSubmit={(e)=>{handleform(e)}}>
                <label>Username</label>
                <input type='text'
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                className="form-control"/>

                <label>Password</label>
                <input type='text' 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="form-control"/>

                <button type='submit' className="form-control btn btn-success mt-2">Login</button>

                <Link to='/reg'>Don't have an account click here</Link>
            </form>


        </div>
        <div className='col-md-4'></div>
        </div>
        </div>
        </section>
     );
}

export default Login;
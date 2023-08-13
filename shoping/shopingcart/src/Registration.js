import { useState } from 'react'
import { Link } from 'react-router-dom'
function Registration() {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[message,setMessage]=useState('')
    function handleform(e){
        e.preventDefault()
        const formdata={username,password}
        fetch('/api/reg',{        
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formdata)
        }).then((result)=>{return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                setMessage(data.message)
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
            <h2>SIGN UP    ! !  </h2>
            <p>{message}</p>
            <form onSubmit={(e)=>{handleform(e)}}>
                <label>Username</label>
                <input type='text'
                required
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                className="form-control"/>
                <label>Password</label> 
                <input type='text' minLength={5} maxLength={10}
                required
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="form-control"/>
                <button type='submit' className="form-control btn btn-success mt-2">Register</button>
            </form>
            <Link to='/'>click here to login</Link>


        </div>
        <div className='col-md-4'></div>
        </div>
        </div>
        </section>
     );
}

export default Registration;
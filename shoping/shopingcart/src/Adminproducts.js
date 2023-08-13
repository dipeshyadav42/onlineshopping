import { Link, useNavigate } from "react-router-dom";
import Left from "./left";
import { useEffect, useState, useContext } from "react";
import { Contextapi } from "./Contextapi";

function Adminproducts() {
    const navigate=useNavigate()
    const {loginname}=useContext(Contextapi)
    const[products,setProducts]=useState([])
    const [message,setMessage]=useState('')

    if(!loginname){
        navigate('/')
      }

    useEffect(()=>{
        fetch('/api/allproducts').then((result)=>{return result.json()}).then((data)=>{
            // console.log(data)
            if(data.status===200){
                setProducts(data.apiData)
            }else{
                setMessage(data.message)
            }
        })
    },[])

    function handledelete(e,id){
        fetch(`/api/cartdelete/${id}`,{
            method:'DELETE'
        }).then((result)=>{ return result.json()}).then((data)=>{
             console.log(data)
             if(data.status===200){
                navigate('/adminproducts')
             }else{
                setMessage(data.message)
             }
        })
    }
    return ( 
        <section id="mid">
        <div className="container">
        <div className="row">
            <Left/>
            <div className="col-md-9">
                <h2 className="text-center">Products Management</h2>
                <Link to={"/adminaddproduct"}><button className="btn btn-primary form-control">Add More Products</button></Link>
                <table className="table table-hover">
                    {message}
                    <thead>
                        <tr className="text-dark">
                            <th>S.NO</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Product Status</th>
                            <th>Product Quantity</th>
                            <th>Product Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((result,key)=>(
                         <tr key={result._id}>
                              <td>{key+1}</td>
                              <td>{result.name}</td>
                              <td><img src={`./images/${result.img}`} style={{width:'80px'}} alt=""  /></td>
                              <td>{result.desc}</td>
                              <td>{result.price}</td>
                              <td>{result.status}</td>
                              <td>{result.qantity}</td>
                              <td><Link to={`/adminaddproductupdate/${result._id}`}><button className="btn btn-success">Update</button></Link></td>
                              <td><button className="btn btn-success" onClick={(e)=>{handledelete(e,result._id)}}>Delete</button></td>
                          </tr>
                          ))}
                        
                        
                      
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </section>
     );
}

export default Adminproducts;
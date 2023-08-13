import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate=useNavigate()
    const [product,setProduct]=useState([])
    const[message,setMessage]=useState('')
    const{cart,setCart}=useContext(Contextapi)
    let totalamount=0
    useEffect(()=>{
        if(!cart.items){
            return 
        }
        fetch('/api/cartproduct',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ids:Object.keys(cart.items)})
            }).then((result)=>{return result.json()}).then((data)=>{
                // console.log(data)
                if(data.status===200){
                    setProduct(data.apiData)
                }else{
                    setMessage(data.message)
                }
            })
    },[])
   
    function handlequantity(id){
       return cart.items[id]
    }

    function handleprice(id,price){
          let productprice=handlequantity(id)*price  
          totalamount += productprice
         return productprice
    }
    
    function handleinc(e,id){
        let currentqnty=handlequantity(id)
        if(currentqnty===10){
            return
        }
        let _cart={...cart}
        _cart.items[id]=currentqnty+1
        _cart.totalItems+=1
        setCart(_cart)
    }

    function handledesc(e,id){
        let currentqnty=handlequantity(id)
        if(currentqnty===1){
            return
        }

        let _cart={...cart}
        _cart.items[id]=currentqnty-1
        _cart.totalItems-=1
        setCart(_cart)
    }

  

    return ( 
        <>
        {product.length?
        <section id="cart">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Cart Summary</h2>
                        {message}
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Product Quantity</th>
                                    <th>Product Price</th>
                                    <th>Product Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((result,key)=>(
                                         <tr key={result._id} style={{background:'#FEF9E7'}}>
                                         <td>{key+1}</td>
                                         <td style={{fontFamily:'inherit'}}>{result.name}</td>
                                         <td><img src={`./images/${result.img}`} style={{width:'80px'}} alt=""  /></td>
                                         <td><button className="btn btn-dark" onClick={(e)=>{handleinc(e,result._id)}}>+</button>{handlequantity(result._id)}<button  className="btn btn-dark" onClick={(e)=>{handledesc(e,result._id)}}>-</button></td>
                                         <td style={{color:"green"}}>₹{handleprice(result._id,result.price)}</td>
                                         <td></td>
                                     </tr>
                                ))}

                                <tr>
                                    <td colSpan="7"><h4 style={{textAlign:"center",fontFamily:'serif',color:"red"}}>Total Amount Pay:₹{totalamount}</h4></td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

         :<img src="empty3.avif" style={{marginLeft:'400px'}}/> 
         }
        </>
     );
}

export default Cart;
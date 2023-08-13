import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { Link } from "react-router-dom";


function Products() {
    const [products, setProducts] = useState([])
    const { cart, setCart } = useContext(Contextapi)
    useEffect(() => {
        fetch('/api/stockdata').then((result) => { return result.json() }).then((data) => {
            //console.log(data)
            if (data.status === 200) {
                setProducts(data.apiData)
            } else {
            
            }
        })
    }, [])

    

    function handleaddcart(e,product) {
        // console.log(product._id)
        let _cart = { ...cart }
       

        if (!_cart.items) {
            _cart.items = {}
        }

        if (!_cart.items[product._id]) {
            _cart.items[product._id]=1
            
        } else {
            _cart.items[product._id] +=1
        }

        if(!_cart.totalItems){
            _cart.totalItems=1
        }else{
            _cart.totalItems +=1
        }

        setCart(_cart)
        // console.log(cart)


    }

    return (
       
        <section id="products" >
       
            <div className="container">
                <div className="row">
         
                    {products.map((result) => (
                        <div className="col-md-3" key={result._id}>
                            <div className="card mt-2 mb-4" style={{ width: '18rem' }}>
                            <img src={`./images/${result.img}`} style={{width:'100%',height:'250px'}} alt=""  />
                                <div className="card-body">
                                
                                    <h5 className="card-title">{result.name}</h5>
                                    <p className="card-text">{result.desc}</p>
                                    <p className="card-text" style={{color:'red'}}>₹  {result.price}</p>
                                    <button className="btn btn-success me-2" onClick={(e) => { handleaddcart(e,result) }}>Add Cart</button><Link to={"/moredetails"}><button className="btn btn-warning">More Details</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </section>
    );
}

export default Products;
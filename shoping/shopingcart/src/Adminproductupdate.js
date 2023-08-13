import { useEffect, useState } from "react";
import Left from "./left";
import { useParams } from "react-router-dom";

function Adminproductupdate() {
    const[name,setName]=useState('')
    const[desc,setDesc]=useState('')
    const[price,setPrice]=useState('')
    const[qty,setQty]=useState('')
    const[status,setStatus]=useState('')
    const[message,setMessage]=useState('')
   
    const {id}=useParams()
    useEffect(()=>{
        fetch(`/api/singleproduct/${id}`).then((result)=>{ return result.json()}).then((data)=>{
            console.log(data)
            if(data.status===200){
                setName(data.apiData.name)
                setDesc(data.apiData.desc)
                setPrice(data.apiData.price)
                setQty(data.apiData.qantity)
                setStatus(data.apiData.status)
            }else{
                setMessage(data.message)
            }
        })  
    },[])

    function handleform(e){
        e.preventDefault()
        const data={name,price,desc,qty,status}
        fetch(`/api/productupdate/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((result)=>{return result.json()}).then((data)=>{
if(data.status===200){
   setMessage(data.message)
}
else{
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
                    <h2>Product Update Here</h2>
                    {message}      
                    <form onSubmit={(e)=>{handleform(e)}}>
                        <label>Product Name</label>
                        <input type="text" 
                        className="form-control"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        />
                        <label>Product Description</label>
                        <input type="text" 
                        className="form-control"
                        value={desc}
                        onChange={(e)=>{setDesc(e.target.value)}}
                        />
                        <label>Product Price</label>
                        <input type="text"
                         className="form-control"
                         value={price}
                         onChange={(e)=>{setPrice(e.target.value)}}
                         />
                         

                        <label>Quantity</label>
                        <input type="number"
                        className="form-control"
                        value={qty}
                        onChange={(e)=>{setQty(e.target.value)}}
                        />

                        <label>Product Status</label>
                        <select value={status} className="form-control" onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="OUT-STOCK">OUT Stock</option>
                        <option value="IN-STOCK">IN Stock</option>
                        </select>
                        
                        <label>Product Image</label>
                         <input type="file"
                         className="form-control"
                        />
                        <button type="submit" className="btn btn-success mt-2 form-control">Update</button>
                    </form>
                </div>
            </div>
            </div>
        </section>
     );
}

export default Adminproductupdate;
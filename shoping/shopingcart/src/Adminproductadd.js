import { useState } from "react";
import Left from "./left";

function Adminproductadd() {
    const[name,setName]=useState('')
    const[desc,setDesc]=useState('')
    const[price,SetPrice]=useState('')
    const[img,setImg]=useState('')
    const[qty,setQty]=useState('')
    const[message,setMessage]=useState('')

    function handleimage(e){
        setImg(e.target.files[0])
    }

    function handleform(e){
        e.preventDefault()
        //console.log(img)

        let data=new FormData()
        data.append('file',img)
        data.append('pname',name)
        data.append('pdesc',desc)
        data.append('pprice',price)
        data.append('qty',qty)
        fetch('/api/productadd',{
            method:'POST',
            body:data
        }).then((result)=>{ return result.json()}).then((data)=>{
            //console.log(data)
            if(data.status===201){
                setMessage(data.message)
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
                    <h2>Add Product Here</h2>
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
                        onChange={(e)=>{SetPrice(e.target.value)}}
                         />
                         <label>Product Image</label>
                         <input type="file"
                        className="form-control"
                        onChange={(e)=>{handleimage(e)}}
                        />
                        <label>Quantity</label>
                        <input type="number"
                        className="form-control"
                        value={qty}
                        onChange={(e)=>{setQty(e.target.value)}}
                        />
                        <button type="submit" className="btn btn-success mt-2 form-control">Add Product   </button>
                    </form>
                </div>
            </div>
            </div>
        </section>
     );
}

export default Adminproductadd;
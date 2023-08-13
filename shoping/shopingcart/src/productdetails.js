import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Details() {
    const{id}=useParams
    const [name,setName]=useState('')
    const [desc,setDesc]=useState('')
    const [price,setPrice]=useState('')
    const [img,setImg]=useState('')
    const [message,setMessage]=useState('')
    
    useEffect(() => {
        fetch(`/api/stockdata/${id}`).then((result) => { return result.json() }).then((data) => {
            // console.log(data)
            if (data.status === 200) {
                setName(data.apidata.name)
                setDesc(data.apidata.desc)
                setPrice(data.apidata.price)
                setImg(data.apidata.img) 
            } else {
                setMessage(data.message)

            }
        })
    }, [])
    return ( 
        <>
          
             <div className="container">
                <div className="row">
                    <div className="col-md-4">{name}</div>
                    <div className="col-md-8">col2</div>
                </div>
             </div>
            
        </>
     );
}

export default Details;
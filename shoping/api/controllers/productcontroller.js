const Product = require('../models/product')
const Messages = require('../helpers/messages')


exports.add = (req, res) => {
    const imgname = req.file.filename
    const {pname,pdesc,pprice,qty}=req.body
    try {
        const record=new Product({name:pname,desc:pdesc,price:pprice,img:imgname,qantity:qty })
        record.save()
        res.json({
            status: Messages.status.status201,
            apiData: record,
            message: 'Successfully Created'
        })
    } catch (error) {
        res.json({
            status: Messages.status.status400,
            message: error.message
        })
    }
}

exports.allproduct =async(req,res)=>{
    try{
        const record =await Product.find()
        res.json({
            status: Messages.status.status200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: Messages.status.status500,
            message: error.message
        })
    }
}

exports.singleproduct=async(req,res)=>{
    try{
        const id=req.params.id
        const record=await Product.findById(id)
        res.json({
            status: Messages.status.status200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: Messages.status.status400,
            message: error.message
        })
    }
}

exports.productupdate=async(req,res)=>{
    try{
        const id=req.params.id
        const {name,price,desc,qty,status} = req.body
        const record = await Product.findByIdAndUpdate(id,{name:name,price:price,desc:desc,qantity:qty,status:status})
   res.json({
    status:Messages.status.status200,
    message:"Update Successfully",

   })
    }
    catch (error) {
        res.json({
            status:Messages.status.status400,
            message:error.message
        })

    }
}

exports.stockdata=async(req,res)=>{
    try{
    const record=await Product.find({status:'IN-STOCK'})
    // console.log(record)
    res.json({
        status:Messages.status.status200,
        apiData:record
    })
    }catch(error){
        res.json({
        status:Messages.status.status500,
        message:error.message
    })  
    }
}

exports.cartproducts=async(req,res)=>{
    const {ids}=req.body
    try{
    const record=await Product.find({_id:{$in:ids}})
    //  console.log(record)
    res.json({
        status:Messages.status.status200,
        apiData:record
    })
    }catch(error){
        res.json({
            status:Messages.status.status400,
            message:error.message
        })
    }
}

exports.cartdelete=async(req,res)=>{
    const id=req.params.id
    try{
    const record=await Product.findByIdAndDelete(id)
    res.json({
        status:200,
        message:'Successfully Deleted'
    })
    }catch(error){
        res.json({
            status:500,
            message:error.message
        })
    }
}

exports.moredetails=(req,res)=>{
    console.log(req.params.id)
}
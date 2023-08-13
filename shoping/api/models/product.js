const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    img:String,
    qantity:Number,
    status:{type:String,default:'IN-STOCK'}
})


module.exports=mongoose.model('product',productSchema)
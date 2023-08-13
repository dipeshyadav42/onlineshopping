const Reg=require('../models/reg')
const helper=require('../helpers/messages')
const bcrypt=require('bcrypt')


exports.registration=async(req,res)=>{
    const{username,password}=req.body
    let convertedpassword=await bcrypt.hash(password,10)
   //console.log(convertedpassword)
    const userCheck=await Reg.findOne({username:username})
    try{    
        if(userCheck===null){
    const record=new Reg({username:username,password:convertedpassword})
    record.save()
    res.json({
        message:helper.messages.creation,
        apiData:record,
        status:helper.status.status201
    })
}else{
    res.json({
        message:'Username already taken',
        status:helper.status.status400
    })
}
    }catch(error){
        res.json({
            status:helper.status.status400,
            message:error.message
        })
    }

     
}



exports.logincheck=async(req,res)=>{
    const{username,password}=req.body
    try{
    const record=await Reg.findOne({username:username})
    //console.log(record) 
    if(record!==null){
       const passwordcompare=await bcrypt.compare(password,record.password)
        if(passwordcompare){
        res.json({
            status:helper.status.status200,
            apiData:record
        })
    }else{
        res.json({
            status:helper.status.status400,
            message:'Wrong Credentials'
        })
    }
    }else{
        res.json({
            status:helper.status.status400,
            message:'Wrong Credentials'
        })
    }
}catch(error){
    res.json({
        status:helper.status.status400,
        message:error.message
    })
}
}
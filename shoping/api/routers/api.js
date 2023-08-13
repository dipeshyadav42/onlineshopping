const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const productc=require('../controllers/productcontroller')
const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        cb(null, Date.now() +file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})

router.post('/reg',regc.registration)
router.post('/logincheck',regc.logincheck)
router.post('/productadd',upload.single('file'),productc.add)
router.get('/allproducts',productc.allproduct)   
router.get('/singleproduct/:id',productc.singleproduct)
router.put('/productupdate/:id',productc.productupdate)
router.post('/cartproduct',productc.cartproducts)
router.delete('/cartdelete/:id',productc.cartdelete)
router.get('/stockdata',productc.stockdata)





module.exports=router
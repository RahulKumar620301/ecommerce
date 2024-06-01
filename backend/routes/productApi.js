const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const router = express.Router()


const Product = require('./../model/product')

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');


router.get('/', (req,res) => {
	Product.find({}, (err,data) => {
		if(!err)
			res.send(data)
   else
   	res.send({'Error':err})
	})
})

router.get('/recent', (req,res) => {
  Product.find({}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  }).sort({date:-1}).limit(8)
})

//db.users.find({name: /a/})  // Like '%a%'

//db.product.find({"title": {"$regex": "query", "$options": "i"}})

router.get('/search/:query', (req,res) => {
  let query= req.params.query;
  console.log(query)
  Product.find({"title": {"$regex": query, "$options": "i"}}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  }).sort({date:-1})
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/')
  },
  filename: function (req, file, cb) {
   const filename = file.originalname.toLowerCase().split(' ').join('-') 
    cb(null, filename)
  }
})

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
   let img="http://localhost:3000/public/" + req.file.filename ;
        let data = {
        title:req.body.title, 
        image:img ,
        mrp:req.body.mrp,
        price:req.body.price,
        subcategory:req.body.subcategory,
        brand:req.body.brand,
        spec:req.body.spec,
        features:req.body.features,
        category:req.body.category,
        description:req.body.description};

 const rec = new Product(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Record Saved',st:1});
else{
console.log(err)
	res.send({response:'Error in Code',st:0 , error:err});
}

})
})


router.get('/:id',(req,res) =>{
  Product.findOne({_id:req.params.id} ,(err,data) =>{
    if(!err)
      res.send(data)
    else
      res.send({'Error' :err})
  })
})


router.get('/sub/:subcategory', (req,res) => {
  Product.find({subcategory:req.params.subcategory}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.get('/category/:category', (req,res) => {
  Product.find({category:req.params.category}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.get('/brand/:brand', (req,res) => {
  Product.find({brand:req.params.brand}, (err,data) => {
    if(!err)
      res.send(data)
   else
    res.send({'Error':err})
  })
})

router.patch('/data/:id',(req,res) =>{
      let data = {title:req.body.title ,mrp:req.body.body,price:req.body.price,
      subcategory:req.body.subcategory,
category:req.body.category,description:req.body.description};
  Product.updateOne({_id:req.body.id},data ,(err)=>{
    if(!err)
      res.send({Response:"Record update"})
  })
  res.send({'Error':err})
})

router.patch('/', upload.single('image'), (req, res) => {
   let img  = " http://localhost:3000/public/" + req.file.filename ;
        let data = {
          title:req.body.title, 
        image:img ,
        mrp:req.body.mrp,
        price:req.body.price,
        subcategory:req.body.subcategory,
        brand:req.body.brand,
        spec:req.body.spec,
        features:req.body.features,
        category:req.body.category,
        description:req.body.description};

rec.updateOne({_id:req.body.id},data,()=>{
if(!err)
  res.send({response:'Record Saved',st:1});
else{

  res.send({response:'Error in Code',st:0 , error:err});
}
})
})



router.delete('/:id', (req, res) => {
  Product.deleteOne({_id:req.params.id},(err,data)=>{
    if(!err)
      res.send({response:'Record Deleted',st:1});
      else
      res.send({'Error':err})
  })  
})

module.exports = router;

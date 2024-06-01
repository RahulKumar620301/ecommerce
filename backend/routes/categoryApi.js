const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')


const router = express.Router()
const Category = require('../model/category') 
mongoose.connect('mongodb://127.0.0.1:27017/elecdb')


const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  limits: {    fileSize: 1024 * 1024 * 5     },
  fileFilter: (req, file, cb) => {
if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {                                
      cb(null, true);        
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

//all users data
router.get('/',(req,res)=>{
	Category.find((err,data)=>{
		if(!err)
			res.send(data);
		else
			res.send({response:"Error in code",st:0,error:err});
	})
})


router.delete('/:id',(req,res)=>{
	let id=req.params.id;
	Category.deleteOne({_id:id},(err)=>{
		if(!err)
			res.send({response:"category Deleted",st:1})
		else
			res.send({response:"Error in code",st:0,error:err})
	})
})

router.post('/',upload.single('image'),(req,res)=>{
		let img= "http://localhost:3000/public/"+req.file.filename;
	let formData= new Category({
		title:req.body.title,
		image:img,//*
		description:req.body.description,
	})

	formData.save(err=>{
		if(!err)
			res.send({response:"category saved",st:1})
		else
			res.send({response:"Error in code",st:0,error:err})
	})
})

router.delete('',(req,res)=>{
	Category.deleteMany({},(err,data)=>{
		if(!err)
            res.send({response:"Account deleted",st:1})		
        else
			res.send({response:"Error in code",st:0,error:err});
	})
})

module.exports=router;
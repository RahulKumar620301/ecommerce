const express = require('express');
const router  = express.Router();
const  mongoose = require('mongoose');
const Brand =  require('../model/brand');
const multer = require('multer');

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/' ,(req,res) =>{

	Brand.find({},(err,data) =>{
		if(!err)
			res.send(data)
		else
			res.send({'Error' :err})
	})
})

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


router.post('/', upload.single('image'), (req, res) => {
   let img  = "http://localhost:3000/public/" + req.file.filename ;
    let data = {title:req.body.title, image:img ,description:req.body.description};

 const rec = new Brand(data);
rec.save((err)=>{
if(!err)
	res.send({response:'Record Saved',st:1});
else{
	res.send({response:'Error in Code',st:0});
}
})
})


router.delete('/:id', (req, res) => {
  Brand.deleteOne({_id:req.params.id},(err,data)=>{
    if(!err)
      res.send({response:'Record Deleted',st:1});
      else
      res.send({'Error':err})
  })  
})

router.get('/:id',(req,res) =>{
  Brand.findOne({_id:req.params.id} ,(err,data) =>{
    if(!err)
      res.send(data)
    else
      res.send({'Error' :err})
  })
})

module.exports = router;

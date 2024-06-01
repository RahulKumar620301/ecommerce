const express= require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Address=require('../model/address');
mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/user/:userId',(req,res)=>
{
	Address.find({userId:req.params.userId},(err,data)=>{
		if(!err){
			res.send(data);
		}
		else
			res.send({Response:'Error in code',st:0})
	})
})

router.get('/:id',(req,res)=>
{
	Address.findOne({_id:req.params.id},(err,data)=>{
		if(!err){
			res.send(data);
		}
		else
			res.send({Response:'Error in code',st:0})
	})
})


router.post('/',(req,res)=>{
	let data={
		userId:req.body.userId,
		area:req.body.area,
		address:req.body.address,
		city:req.body.city,
		pincode:req.body.pincode,
		landmark:req.body.landmark,
	}
	const rec=new Address(data);
	rec.save((err)=>{
		if(!err)
			res.send({response:'Record Saved',st:1});
		else
			res.send({response:'err in code', st:0});
	})
})

router.patch('/data/:id',(req,res)=>{
	let data={
		area:req.body.area,
		Address:req.body.address,
		city:req.body.city,
		pincode:req.body.pincode,
		landmark:req.body.landmark,
	}
	Address.updateOne({_id:req.params.id},data,(err)=>{
		if(!err)
			res.send({response:'Record updated', st:1});
		else
			res.send({response:'Error in code',st:0}); 
	})
})

router.delete('/:id',(req,res)=>{
	Address.deleteOne({_id:req.params.id},(err,data)=>{
		if(!err)
			res.send({response:'Record Deleted',st:1});
		else
			res.send({response:'err in code', st:0});
	})
})

module.exports=router;
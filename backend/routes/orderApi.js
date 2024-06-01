const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Order = require('../model/order');
const nodemailer = require("nodemailer");


mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

router.get('/', (req,res) => {
	Order.find({}, (err,data) => {
		if(!err)
			res.send(data)
   else
   	res.send({'Error':err})
	})
})

router.get('/user/:userId', (req,res) => {
	Order.find({userId :req.params.userId}, (err,data) => {
        if(!err)
		res.send(data)
   else
   	res.send({'Error':err})
	})
})

router.get('/:id', (req,res) => {
	Order.findOne({_id:req.params.id}, (err,data) => {
		if(!err)
			res.send(data)
   else
   	res.send({'Error':err})
	})
})

router.post('/',  (req, res) => {
  
        let data = {emailId:req.body.emailId,firstName:req.body.firstName,
        lastName:req.body.lastName,
        addressId:req.body.addressId,
userId:req.body.userId,subtotal:req.body.subtotal ,
charges:req.body.charges,status:req.body.status,mode:req.body.mode,};

 const rec = new Order(data);
rec.save((err,doc)=>{
if(!err){
	sendMail(data,info=>console.log("Message sent: %s", info.messageId));//*

	res.send({response:'Order placed successfully',st:1,docId:doc._id});
}
else{

	res.send({response:'Error in Code',st:0 , error:err});
}
})
})

router.patch('/status/:id',(req,res) =>{
	let status=req.body.status;
	let m_data={emailId:req.body.emailId,firstName:req.body.firstName,
	lastName:req.body.lastName}
Order.updateOne({_id:req.params.id},{status:status}, (err) =>{
        if(!err){
        	if(status=="Shipped"){
        	        s_sendMail(m_data,info=>console.log("Message sent: %s", info.messageId));//*
        	}
        	else if(status=="Delivered"){
        		d_sendMail(m_data,info=>console.log("Message sent: %s", info.messageId));//*

        	}


		res.send({response:"status updated",st:1})
	}
		else
			res.send({response:"Error in code",st:0,error:err})
})
})
async function sendMail(data, cb) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pentagonalt91@gmail.com', // generated ethereal user
      pass: 'uxbpddhsgjefidag', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"shopping_site" <pentagonalt91@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: 'Thank you for your order', // Subject line
    html: `<h2>Dear ${data.firstName} ${data.lastName} </h2><p>
    be shipped soon!.</p>
    <p>Our team will respond to your query within 48 hours</p><h3>Regards Shopping-site</h3>`, // html body
  });

cb(info);
}
async function d_sendMail(data, cb) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pentagonalt91@gmail.com', // generated ethereal user
      pass: 'uxbpddhsgjefidag', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"shopping_site" <pentagonalt91@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: 'Your order has been delivered !', // Subject line
    html: `<h2>Dear ${data.firstName} ${data.lastName} </h2><p>
  Your items have been delivered</p>
    <p>We’re happy to let you know that your order has been delivered.</p><h3>Regards Shopping-site</h3>`, // html body
  });

cb(info);
}
async function s_sendMail(data,cb) { //mail for order shipped

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pentagonalt91@gmail.com', // generated ethereal user
      pass: 'uxbpddhsgjefidag', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"shopping_site" <pentagonalt91@gmail.com>', // sender address
    to: data.emailId, // list of receivers
    subject: "Your order has shipped !", // Subject line
    html: `<b>Dear ${data.firstName} ${data.lastName} </b>
    <br><p>Your package is on its way
</p><p> 
   Your order will be delivered within the next 5-6 days…
</p>
    <h3>Regards shopping_site</h3>`, // html body
  });
  cb(info);

}
module.exports = router;




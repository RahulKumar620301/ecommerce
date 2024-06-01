const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema(
{
	userId:{type:String,required:[true,'userid required']},
	title:{type:String,required:[true,'userid required']},
	image:{type:String,required:[true,'image required']},
	productId:{type:String,required:[true,'product required']},
	quantity:{type:String,required:[true,'quantity required']},
	price:{type:String,required:[true,'price required']},
	mrp: {type: String, required: [true, 'mrp Required']},
    status: {type: String, default:'cart'},
    orderId: {type: String,default:null},
    date:{type:Date,default:Date.now},
})
module.exports=mongoose.model('cart',cartSchema,'cart');
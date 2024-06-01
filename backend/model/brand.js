const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema(
{
	title:{type:String,required:[true,'title required']},
	image:{type:String,required:[true,'image required']},
	description:{type:String},
})
module.exports=mongoose.model('brand',brandSchema,'brand');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
{
	title:{type:String,required:[true,'userid required']},
	mrp:{type:String,required:[true,'mrp required']},
	price:{type:String,required:[true,'price required']},
	image:{type:String,required:[true,'image required']},
	description:{type:String,required:[true,'description required']},
	features:{type:String,required:[true,'features required']},
	spec:{type:String,required:[true,'spec required']},
	category: {type: String, required: [true, 'category Required']},
    subcategory: {type: String, required: [true, 'subcategory Required']},
    brand: {type: String, required: [true, 'Brand Required']},
    date:{type:Date,default:Date.now},
})
module.exports=mongoose.model('product',productSchema,'product');
const mongoose=require ('mongoose');

const categorySchema = new mongoose.Schema(
{
	title:{type:String,required:[true,'Title required']},
	image:{type:String,required:[true,'image required']},
	description:{type:String},
})
module.exports=mongoose.model('category',categorySchema,'category');
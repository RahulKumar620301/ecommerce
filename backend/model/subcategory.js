const mongoose=require ('mongoose');

const subcategorySchema = new mongoose.Schema(
{
	subcategory:{type:String,required:[true,'subcategory required']},
	categoryId:{type:String,required:[true,'categoryId required']},
})
module.exports=mongoose.model('subcategory',subcategorySchema,'subcategory');
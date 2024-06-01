const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema(
{
	userId:{type:String,required:[true,'userid required']},
	area:{type:String,required:[true,'area required']},
	address:{type:String,required:[true,'address required']},
	city:{type:String,required:[true,'city required']},
	pincode:{type:String,required:[true,'pincode required']},
	landmark:{type:String,required:[true,'landmark required']},
})
module.exports=mongoose.model('address',addressSchema,'address');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: {type: String, required: [true, 'First Name Required']},
  lastName: {type: String, required: [true, 'Last Name Required']},
  emailId: {type: String, required: [true, 'Email id Required']},
  userId: {type: String, required: [true, 'userId Required']},
  addressId:{type: String, required: [true, 'addressId Required']},
  subtotal:{type:String,required:[true,'subtotal required']},
  charges:{type:String,required:[true,'charges required']},
  status:{type:String,required:[true,'status required']},
  mode:{type: String, required:[true,'mode Required']},
  rorderId:{type:String, default: null},
  date:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('order',orderSchema, 'order'); //schema
//db=projectDb, collection:User
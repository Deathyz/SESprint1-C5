var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  id: {
       title: 'ID',
       type: 'number',
       editable: false,
       addable: false,
     },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    editable: false,
    addable: false,
  },
  updatedAt:{
    type:Date,
    default:Date.now,
    editable: false,
    addable: false,
  },
  seller:{
    type:String,
  },

},{collection: 'Products'}
);

mongoose.model('Product', productSchema);

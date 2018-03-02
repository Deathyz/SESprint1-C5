var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");

//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: Date
// },{collection: 'Products'}
// );

  var ProductsObj = [

    {name:'Bread',price:10.5,seller:'Nour Nounou'},
    {name:'Cheese',price:23.25,seller:'Nour Nounou'},
    {name:'Milk',price:13,seller:'Nour Nounou'},
    {name:'Coffee',price:6.75,seller:'Nour Nounou'},
    {name:'Gum',price:4,seller:'Nour Nounou'},
    {name:'Plastic Bags',price:1.25,seller:'Nour Nounou'},


  ];

  var usersObj = [
    { username: '1', password: '1'},
    { username: '2', password: '2'},
    { username: 'user', password: 'user'},
    { username: 'admin', password: 'admin'},
    { username: 'manager', password: 'manager'}
  ];

  var collectionsObj = [
    {name: 'Products', data: ProductsObj},
    {name: 'Users', data: usersObj},
  ];

  for (var i = 0; i < collectionsObj.length; i++){
    if(collectionsObj[i].data == null){
      dbo.createCollection(collectionsObj[i].name , function(err, res){
        if(err) throw err;
        done = true;
      });
    } else {
      dbo.collection(collectionsObj[i].name).insertMany(collectionsObj[i].data,function(err,res) {
        if(err) throw err;
        done = true;
      });
    }
    console.log("Collection: "+collectionsObj[i].name+" created !");
  }
  console.log("Press Control C");
});

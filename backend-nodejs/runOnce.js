var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");

  var ProductsObj = [
   {id: 1, name: 'Samsung S6',price: 8000,createdAt: '2018-03-02 15:25:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
   {id: 2, name: 'Samsung S7',price: 10000,createdAt: '2018-03-02 16:35:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
   {id: 3, name: 'Samsung S7 Edge',price: 12000,createdAt: '2018-03-02 17:40:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
   {id: 4, name: 'Samsung S8',price: 14000,createdAt: '2018-03-02 18:35:12.623',updatedAt:'',seller:'Mahmoud Gamal'},
   {id: 5, name: 'Samsung Note 8',price: 15000,createdAt: '2018-03-02 19:39:17.623',updatedAt:'',seller:'Mahmoud Gamal'},

 ];

  var usersObj = [
    { username: '1', password: '1',type:'user'},
     { username: '2', password: '2',type:'admin'},
     { username: 'user', password: 'user',type:'user'},
     { username: 'admin', password: 'admin',type:'admin'},
     { username: 'manager', password: 'manager',type:'manager'}
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

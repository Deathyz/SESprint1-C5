var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");

  var ProductsObj = [
    {id: 1, name: 'Iphone6',price: 9000,createdAt: '2018-03-01 15:25:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {id: 2, name: 'Iphone7',price: 12000,createdAt: '2018-03-01 16:35:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {id: 3, name: 'Iphone7 plus',price: 15000,createdAt: '2018-03-01 17:40:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {id: 4, name: 'Iphone 9',price: 18000,createdAt: '2018-03-01 18:35:12.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {id: 5, name: 'Iphone 10',price: 21000,createdAt: '2018-03-01 19:39:17.623',updatedAt:'',seller:'Tarek Abdelrahman'},

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

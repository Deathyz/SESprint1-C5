var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");  

  var ProductsObj = [
    { name: 'kebab',price: 40,createdAt: '2018-03-02 17:25:14.623',updatedAt:'',seller:'Mohamed Adel'},
    { name: 'blueberry',price: 10,createdAt: '2018-03-02 18:35:14.623',updatedAt:'',seller:'Mohamed Adel'},
    { name: 'banna',price:20 ,createdAt: '2018-03-02 17:40:14.623',updatedAt:'',seller:'Mohamed Adel'},
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
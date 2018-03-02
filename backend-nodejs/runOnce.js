var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Store-Database";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Store-Database");

  var ProductsObj = [
    { name: 'kebab',price: 40,createdAt: '2018-03-02 17:25:14.623',updatedAt:'',seller:'Mohamed Adel'},
    { name: 'blueberry',price: 10,createdAt: '2018-03-02 18:35:14.623',updatedAt:'',seller:'Mohamed Adel'},
    { name: 'banna',price:20 ,createdAt: '2018-03-02 17:40:14.623',updatedAt:'',seller:'Mohamed Adel'},
    { name: 'Samsung S6',price: 8000,createdAt: '2018-03-02 2:25:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
    { name: 'Samsung S7',price: 10000,createdAt: '2018-03-02 3:35:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
    { name: 'Samsung S7 Edge',price: 12000,createdAt: '2018-03-02 4:40:14.623',updatedAt:'',seller:'Mahmoud Gamal'},
    { name: 'Samsung S8',price: 14000,createdAt: '2018-03-02 5:35:12.623',updatedAt:'',seller:'Mahmoud Gamal'},
    { name: 'Samsung Note 8',price: 15000,createdAt: '2018-03-02 6:39:17.623',updatedAt:'',seller:'Mahmoud Gamal'},
    {name: 'Iphone6',price: 9000,createdAt: '2018-03-01 15:25:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {name: 'Iphone7',price: 12000,createdAt: '2018-03-01 16:35:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {name: 'Iphone7 plus',price: 15000,createdAt: '2018-03-01 17:40:14.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {name: 'Iphone 9',price: 18000,createdAt: '2018-03-01 18:35:12.623',updatedAt:'',seller:'Tarek Abdelrahman'},
    {name: 'Iphone 10',price: 21000,createdAt: '2018-03-01 19:39:17.623',updatedAt:'',seller:'Tarek Abdelrahman'},
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

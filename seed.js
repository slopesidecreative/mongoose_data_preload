
var mongoose      =     require('mongoose');
var fs            =     require('fs');
var path          =     require('path');
var dburi         =     'mongodb://localhost/bbelt_seed2';
var root          =     __dirname;
var models_path   =     path.join(root, './../models');

require(path.join(models_path,'products.js'));

var Product = mongoose.model("Product");

mongoose.connect( dburi );

// clear the collection
Product.remove({}, function(err) {
          if (err) {
             console.log(err);
          } else {
             seed();
          }
      }
  );

function seed(){
   var productData = [
      new Product({name:"wonder woman",img:"http://d1whee3s2ff61n.cloudfront.net/product/extralarge/145019.jpg"}),
      new Product({name:"batman",img:"http://cartoonbros.com/wp-content/uploads/2016/05/Batman-5.jpg"}),
      new Product({name:"spiderman",img:"http://orig10.deviantart.net/7d99/f/2014/355/3/9/mcu_spider_man___concept_art_by_mrsteiners-d8aj70d.png"})
   ];

   var done = 0;
   for (var i=0; i<productData.length; i++){
      done ++;
      productData[i].save(function(err,result){
         if(err){ console.log('error!',err);}
         console.log('added:',result);
            if(done == productData.length){
               console.log('done!!');
               exit();
            }
      });
   }
}

function exit(){
   mongoose.disconnect();
}

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });// fruitsDB 

const fruitSchema = new mongoose.Schema({//SCHEMA for fruits collection
      name: {
        type: String,
        required: [true, "please check your data entry, no name specified"]
            },
      
      rating: { 
        type: Number,
        min: 1   ,//adding validation
        max: 10//adding validation
        
      },
      review: String
      });
  
const Fruit = mongoose.model("Fruit", fruitSchema); //MODEL We have to speficty the singular form of Fruits. MOngo will convert ur single word to plural and drop the capitol letter  when making your collections. Those Fruits have to fit in the schema strutcture 'fruitSchema'. Fruit = collection and 2nd parameter is the schema

const fruit = new Fruit ({ //creating a new fruit document from Model: Fruit and it shoud stick to our fruitSchema
      
        rating: 9,
        review: "pretty solid as fruit"
        });
        
      //   fruit.save()

  const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema //datatype for embedding a fruit document for this property called favoriteFruit inside our person document
  });




const Person = mongoose.model("Person", personSchema); //MODEL We have to speficty the singular form of Fruits. MOngo will convert ur single word to plural and drop the capitol letter  when making your collections. Those Fruits have to fit in the schema strutcture 'fruitSchema'

      
const strawberry = new Fruit({ //creating new fruit
  name: "Strawberry",
  score: 9,
  review: "Great berryt"
  });
  strawberry.save();//saving this fruit into our fruits collection
  
  Person.updateOne({name: "Jhon"}, {favoriteFruit: strawberry}, function(err){
    if (err) {
      console.log(err); }
      else{
        console.log("updated")
    }
   }); //updating Jhon, calling our Person model which will tap into our people collection, 
   
   
// const person = new Person ({ //creating a new fruit document from Model: Fruit and it shoud stick to our fruitSchema
//       name: "Amy", // adding pineapple as an embedded document to this new person
//       age: 12,
//       favoriteFruit: pineapple
//       });
      
//       person.save();//this is the way to save your object unto database

  Fruit.find(function(err, fruits){//tapping into our Fruit model or collections of Fruit. This find function can accept a callback function. First parametor is error and the seconds one is whatever it can finds back- so we can call it whatever we want. Here wer are getting all of our fruits back. 
     if (err) { // callbacks can be used to log errors
     console.log(err);// all this for taking a look at databse with mnongoose
     }else {
     
      mongoose.connection.close();//db closes after dealing w db so u dont have to contrl C      
      fruits.forEach(function(fruit){    //picking each fruit in the array. we are looping through our fruits array that we got through our database
       console.log(fruit.name);  
          });   
         }
        });
 //1`11
// Fruit.deleteOne({_id: "5f4c666a709a290385d5e8fe"}, function(err){  // new mongoose syntax "_id"
//       if(err){console.log(err);}
//       else{
//         console.log("Success");
//       }
//       });
// tapping into the fruits collection, the fruits model by using "Fruit."" 

// Person.deleteMany({name: /Jhon/}, function(err){ // first parameter is the condition
//   if(err){console.log(err);}
//       else{
//         console.log("Success");
//         }
//         });

  const findDocuments = function(db, callback) {
      const collection = db.collection('fruits'); // Get the documents collection
            collection.find({}).toArray(function(err, fruits) { // fruits will be saved into an array. This is also a callback function. // Find some documents
              assert.equal(err, null);
              console.log("Found the following records");
              console.log(fruits);
              callback(docs);
            });
             } 



var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs=require("ejs")
const app = express()
app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use('/',express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://kishore:kishore789@cluster0.znzkwdd.mongodb.net/mydb')

var db =mongoose.connection;

db.on('error',()=>console.log("Error in Connection to database"));
db.once('open',()=>console.log("Connected to Database"))

const movieSchema =new mongoose.Schema({  
    product : String
},
{ 
    collection:'note4'
})

const Movie = mongoose.model('Movie',movieSchema);



  app.get('/',(req,res)=>{
   Movie.find({},function(err,movies){
    res.render('order',{ 
         MovieList: movies
   })   
   });
    
})
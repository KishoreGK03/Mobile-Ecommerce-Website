var express = require("express")
var bodyParser=require("body-parser")
var mongoose = require("mongoose")
const { response } = require("express")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://kishore:kishore789@cluster0.znzkwdd.mongodb.net/mydb',{
    useNewUrLParser: true,
    useUnifiedTopology: true
});

var db= mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Conncted to Database"));

app.post("/sign_up",(req,res)=>{
    var name= req.body.username;
    var email= req.body.mail;
    var phno = req.body.phno;
    var password = req.body.password;
    var data= {
        "name": name,
        "email": email,
        "phno":phno,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    })
    return res.redirect('index.html')
})


let alert = require('alert'); 
let user_name;

var db = mongoose.connection;
db.on('error',()=>console.log('Error in Connecting to Database'));
app.post("/login",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log("logged in : "+email);
    db.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    var count = 0;
        for (let i =0; i<result.length; i++){
            
            if (email == result[i].email && password == result[i].password){
                user_name=result[i].name;
                alert("Welcome "+user_name+" Your are successfully logged in!")
                return res.redirect('home.html')
                
            }
            else{
                count+=1;
            }
            if(count==result.length){
             res.redirect('index.html');
             console.log("User doesn't have an account")
             alert("You donot have an account! Please Sign Up!")
            }
        }
});
})

app.get("/contact", (req, res)=>{
    res.redirect('contact.html')
})
app.post("/contact", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var review = req.body.review;
    var data1 = {
        "name" : name,
        "email": email,
        "phno" : phno,
        "review" : review,
    }

    db.collection('review').insertOne(data1,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Review collected!");
        alert("You're Review has been filed successfully!")

    })
    return res.redirect('home.html')
})



app.get("/buynow", (req, res)=>{
    res.redirect('buynow.html')
})
app.post("/buynow", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var city = req.body.city;
    var zip = req.body.zip;
    var transactionid = req.body.transactionid;
    var data2 = {
        "name" : name,
        "email": email,
        "phno" : phno,
        "city" : city,
        "zip" : zip,
        "transactionid": transactionid,
    }

    db.collection('payment').insertOne(data2,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Payment details received!");
        alert("Payment details is received successfully, our Team will verify!")
    })
    return res.redirect('home.html')
})


app.post("/product", function(req, res){
    var product = req.body.product;
    console.log(product)
    var data3 = {
        "product":product
    }
    db.collection('product').insertOne(data3,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("Record Inserted Successfully");
  });
  return res.redirect('home.html')
})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin" : '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");
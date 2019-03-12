//initialise and import all the modules
var express=require("express");
var mongoose=require("mongoose");
var bp=require("body-parser");
var app=express();
app.use(bp.urlencoded({extended:true}));
app.set("view engine", "ejs");

//database connection and schema
mongoose.connect("mongodb://localhost/cats");
var userschema= new mongoose.Schema({
	name:{type:String, required: true},
	phno:{type:Number, required:true},
	email:{type:String, required: true, unique: true},
	password:{type:String, required: true}
});
var auth=new mongoose.Schema({
	uname:{type:String},
	phone:{type:Number},
	mail:{type:String}
});
var user= mongoose.model("user", userschema);
var authen=mongoose.model("auth", userschema);
//root route 
app.get("/",function(req,res){
	res.send("<h1>WELCOME USER</h1>")
});
//sign up route
app.get("/register", function(req,res){
	res.render("mongo_test");
});
 app.post("/save", function(req, res){


//retreive the values from the form amd save them 
var u=new user({
	name:req.body.uname,
	phno:req.body.phNo,
	email:req.body.email,
	password:req.body.password
});
u.save (function(err,u){
if(err){
	res.json(err);
}
else{
	res.redirect("success");
	console.log(u);
	}
}
)
});
//successful submission route. 
app.get("/success",function(req,res){
	res.send("Success")
});

//login routes
app.get("/login",function(req,res){
	res.render("signin");
});
var z;
app.post("/detailscheck", function(req,res){
	var x={email: req.body.email};
	user.find(x,function(err,u){
		if(err) res.json(err);
		else{
			
			if(u.password==req.body.pass){
				
					if(err) res.json(err);
					
					else res.render("user",{id:"arushi"});
			}
			else{
				res.send("Sorry server down");
			}
		}
	})
});
app.get("/user",function(req,res){
	res.send("<H1 align=center> Welcome,"+id+"</H1>");
});
app.listen(3000, function(){
	console.log("server is running at port:3000");
});


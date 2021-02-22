const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/healthcareDB', {useNewUrlParser: true, useUnifiedTopology:true});

const deptSchema = new mongoose.Schema({
    name:String
})

const DEPARTMENT = mongoose.model("DEPARTMENT", deptSchema);

// const dept1 = new DEPARTMENT({
//     name:"Neurology"
// });

// dept1.save();

app.get("/", function(req, res){
    res.render("index");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/labreporter", function(req, res){
    res.render("labreporter");
});

app.get("/patientDashboard", function(req, res){
    res.render("patientDashboard");
});

app.get("/doctordashboard", function(req, res){
    res.render("doctordashboard");
});

app.get("/search", function(req, res){
    DEPARTMENT.find({}, function(err, fetchedList){
        if(!err){
            res.render("search", {deptList: fetchedList});
        }
    });
});


app.get("/department/:dept", function(req, res){
    const dept = req.params.dept;
    res.render("department", {deptName: dept });
});

app.get("/appointment", function(req,res){
    res.render("appointment");
});




app.listen(3000, function(){
    console.log("Server started on port 3000");
});

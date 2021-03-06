const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");



const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb+srv://inder:inderajith@cluster0.enrtk.mongodb.net/Cluster0?retryWrites=true&w=majority/listsDB', {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost:27017/Listdb',{useNewUrlParser: true, useUnifiedTopology: true});


const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);


const item1 = new Item({
  name: "Have a nice day :)"
});


const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

const list1 = new List({
  name: "Home",
  items: item1
})

app.get("/", function(req, res) {

  Item.find({}, function(err, dbitems){
    if(dbitems.length === 0)
    {
        List.find({}, function(err, fetchedlist){
          if(fetchedlist.length === 0){
            List.insertMany([list1], function(err){
              if(!err){
                console.log("First list inserted successfully");
              }
            })
          }
        })

      Item.insertMany([item1], function(err){
        if(err){console.log(err);}
        else{console.log("Sucessfully updated the list items into the list")};
      });
      res.redirect("/");
    }

    else{
      List.find({}, function(err, fetchedList){
        if(!err){
          res.render("list", {listTitle: "today", newListItems: dbitems, categories: fetchedList});
        }
      })
    }
  })



});

app.post("/", function(req, res){

  const itemm = req.body.newItem;
  const lname = req.body.list;
    const newitem = new Item({
      name: itemm
    })
    if(lname === "today"){
      newitem.save();
      res.redirect("/");
    }else{
      List.findOne({name: lname}, function(err, mylist){
        mylist.items.push(newitem);
        mylist.save();
        res.redirect("/" + lname);
      })
    }
});

app.post("/delete", function(req, res){
  const delID = req.body.checkbox;
  const lname = req.body.ListName;

  if(lname === "today"){
    Item.findByIdAndDelete(delID, function(err){
      if(err){console.log(err);}else{console.log("deleted sucessfully");}
    })
    res.redirect("/");
  }else{
    List.findOneAndUpdate({name: lname}, {$pull: {items:{_id: delID}}}, function(err){
      if(!err){
        res.redirect("/" + lname);
      }
    })
  }

});

app.post("/categories", function(req, res){
  const catName = req.body.newItemCat;
  res.redirect("/"+catName);
})


app.get("/:listName", function(req, res){
  const listName = _.capitalize(req.params.listName);

  if(listName !== "Favicon.ico")
  {

  if(listName === "Home")
  {
    res.redirect("/");
  }

  List.findOne({name: listName}, function(err, gottenlist){
    if(!err){
      if(!gottenlist){
        const list = new List({
          name: listName,
          items: [item1]
        });
        list.save();
        res.redirect("/" + listName);
      }
      else{
        List.find({}, function(err, fetchedList){
          if(!err){
            res.render("list", {listTitle: gottenlist.name, newListItems: gottenlist.items, categories: fetchedList});
          }
        })
      }
    }
  })
}
})

app.listen(process.env.PORT || 3000, function() {
//  app.listen(3000, function() {
  console.log("Server started on port 3000");
});



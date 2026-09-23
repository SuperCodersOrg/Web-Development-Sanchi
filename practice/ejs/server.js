const express = require('express');
const app = express();

app.use(express.static('./public'));
app.set("view engine","ejs");

app.get('/home',(req,res)=>{
    res.render("home",{ title : "Home Page"});
});

app.get('/about',(req,res)=>{
    res.render("about" , { title : "About Page"});
});

app.listen(2000,()=>{
    console.log("Server is running on http://localhost:2000");
});
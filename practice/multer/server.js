const express=require('express');
const multer = require('multer');
const app=express();
const upload = multer({ dest : 'file_uploads' });

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/uploads",express.static('file_uploads'));

app.get('/profile',(req,res)=>{
    res.render("form", { uploaded : "" });
});

app.post('/profile',upload.single('profile-img'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    res.render("form", { uploaded : req.file.filename });
});

app.listen(2340,()=>{
    console.log("Server is running on http://localhost:2340");
});
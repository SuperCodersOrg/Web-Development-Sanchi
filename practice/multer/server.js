const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest : 'file_uploads' });

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/uploads",express.static('file_uploads'));

app.get('/',(req,res)=>{
    res.render("form", { uploaded : "" });
});

app.post('/profile',upload.array('profile-img',4),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    const upload = req.files.map( element => element.filename );
    res.render("form", { uploaded : upload } );
});

app.listen(2340,()=>{
    console.log("Server is running on http://localhost:2340");
});

const express = require('express');
const multer = require('multer');
const app = express();
// const upload = multer({ dest : 'file_uploads' });

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'file_uploads');
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname );
    }
});

const upload = multer({ storage : storage });

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/uploads",express.static('file_uploads'));

app.get('/',(req,res)=>{
    res.render("form", { avatar : "" , profile : [] });
});

// app.post('/profile',upload.single('profile'),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
//     res.render("form", { uploaded : req.filename } );
// });

// app.post('/profile',upload.array('profile',4),(req,res)=>{
//     console.log(req.body);
//     console.log(req.files);
//     const upload = req.files.map( element => element.filename );
//     res.render("form", { uploaded : upload } );
// });

const uploadMiddleWare = upload.fields([
    { 'name' : 'avatar' , 'maxCount' : 1 } ,
    { 'name' : 'profile' , 'maxCount' : 4 }
]);

app.post('/profile',uploadMiddleWare,(req,res)=>{
    console.log(req.files);
    const avatar = req.files['avatar'][0].filename;
    const profile = req.files['profile'].map( element => element.filename );
    res.render("form" , { avatar , profile });
});

// const storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         cb(null,'/file_uploads');
//     },
//     filename : (req,file,cb)=>{
//         if(err) return cb(err);
//         cb(null, file.fieldname + '-' + raw.toString('hex'));
//     }
// });

// const upload = multer({ storage : storage });

app.listen(2340,()=>{
    console.log("Server is running on http://localhost:2340");
});

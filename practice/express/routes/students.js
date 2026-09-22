const express=require('express');
const router=express.Router();
const app=express();

app.use(express.static('public'));

const islogged=(req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.redirect('../frontend/login.html');
    }
}

// router.get('/',islogged,(req,res)=>{
//     res.send("students portal");
// })

// router.get('/about',(req,res)=>{
//     res.send("about");
// })

// router.get('/result',(req,res)=>{
//     res.send("students result");
// })

router.get('/info',islogged,(req,res)=>{
    res.redirect('../public/studentinfo.html');
});


module.exports=router;
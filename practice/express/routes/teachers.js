const express=require('express');
const router=express.Router();
const app=express();

app.use(express.static('public'));

const islogged=(req,res,next)=>{
    if(req.session.user){
        next();
    }
    else{
        res.redirect('../public/login.html');
    }
}

// router.get('/',islogged,(req,res)=>{
//     res.send("teacher portal");
// })

// router.get('/about',(req,res)=>{
//     res.send("about");
// })

router.get('/info',islogged,(req,res)=>{
    res.redirect('../public/teacherinfo.html');
})

module.exports=router;
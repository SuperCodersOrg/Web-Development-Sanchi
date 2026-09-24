const express=require('express');
const router=express.Router();
const path=require('path');
const app=express();

router.use(express.static(path.join(__dirname, '..' , 'public')));
console.log(path.join(__dirname,'..','public'));
router.use(express.urlencoded({ extended: true }));

router.get('/student/profile',(req,res)=>{
    if(req.session.user.role == 'student')
    res.redirect('/studentprofile.html');
})

router.get('/student/info',(req,res)=>{
    console.log(req.session);
    console.log(req.session.user.role);
    res.redirect('/studentinfo.html');
});

router.get('/student/result',(req,res)=>{
    if(req.session.user.role == 'student')
    res.redirect('/result.html');
});

module.exports=router;
const express=require('express');
const router=express.Router();
const path=require('path');
const app=express();

router.use(express.static(path.join(__dirname, '..' , 'public')));
console.log(path.join(__dirname,'..','public'));
router.use(express.urlencoded({ extended: true }));

router.get('/student/profile',(req,res)=>{
    if(req.session.user.role == 'student')
    res.sendFile(path.join(__dirname,'..','public','studentprofile.html'));
    //     return res.redirect('/teacher/profile');
    // res.redirect('../public/studentprofile.html');
})

router.get('/student/info',(req,res)=>{
    console.log(req.session);
    console.log(req.session.user.role);
    if(req.session.user.role == 'student')
        // res.redirect('./studentinfo.html');
    res.sendFile(path.join(__dirname,'..','public','studentinfo.html'));
    // res.redirect('../public/studentinfo.html');
});

router.get('/student/result',(req,res)=>{
    if(req.session.user.role == 'student')
        res.sendFile(path.join(__dirname,'..','public','result.html'));
    //     return res.redirect('/teacher/timetable');
    // res.redirect('../public/result/.html');
});

module.exports=router;
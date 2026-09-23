const express=require('express');
const router=express.Router();
const path=require('path');
const app=express();

app.use(express.static(path.join(__dirname, '..' , 'public')));
app.use(express.urlencoded({ extended: true }));

router.get('/student/profile',(req,res)=>{
    if(req.session.role != 'student')
        return res.redirect('/teacher/profile');
    res.redirect('../public/studentprofile.html');
})

router.get('/student/info',(req,res)=>{
    console.log(req.session);
    console.log(req.session.user.role);
    if('student' == 'student')
        // res.redirect('./studentinfo.html');
    res.redirect('../public/studentinfo.html');
});

router.get('/student/result',(req,res)=>{
    if(req.session.role != 'student')
        return res.redirect('/teacher/timetable');
    res.redirect('../public/result/.html');
});

module.exports=router;
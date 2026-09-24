const express=require('express');
const router=express.Router();
const app=express();
const path=require('path');

router.use(express.static(path.join(__dirname, '..' , 'public')));
router.use(express.urlencoded({ extended: true }));

router.get('/teacher/info',(req,res)=>{
    if(req.session.user.role == 'teacher')
    res.redirect('/teacherinfo.html');
})

router.get('/teacher/profile',(req,res)=>{
    if(req.session.user.role == 'teacher')
    res.redirect('/teacherprofile.html');
})

router.get('/teacher/timetable',(req,res)=>{ 
    if(req.session.role == 'teacher')
    res.redirect('/timetable.html');
})


module.exports=router;
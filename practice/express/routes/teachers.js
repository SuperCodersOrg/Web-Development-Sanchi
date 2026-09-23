const express=require('express');
const router=express.Router();
const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

router.get('/teacher/profile',(req,res)=>{
    if(req.session.role != 'teacher')
        return res.redirect('/student/profile');
    res.redirect('../public/teacherprofile.html');
})

router.get('/teacher/info',(req,res)=>{
    if(req.session.role != 'teacher')
        return res.redirect('/student/info');
    res.redirect('../public/teacherinfo.html');
})

router.get('/teacher/timetable',(req,res)=>{ 
    if(req.session.role != 'teacher')
        return res.redirect('/student/result');
    res.redirect('../public/timetable.html');
})
// router.get('/',islogged,(req,res)=>{
//     res.send("teacher portal");
// })

// router.get('/about',(req,res)=>{
//     res.send("about");
// })

// router.get('/info',islogged,(req,res)=>{ // why islogged is there
//     res.redirect('../public/teacherinfo.html');
// })

module.exports=router;
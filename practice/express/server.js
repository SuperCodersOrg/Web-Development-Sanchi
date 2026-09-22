const express=require('express');
const session=require('express-session');
const app=express();

const studentsRoutes=require('./routes/students');
const teachersRoutes=require('./routes/teachers');
const authRoutes=require('./auth');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret:'my123secret',
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:1000*60*60*24,
            httpOnly:true
        }
    })
);

app.get('/',(req,res)=>{
    res.redirect('/index.html');
})

app.use('/student',studentsRoutes);
app.use('/teacher',teachersRoutes);
app.use('/',authRoutes);

app.listen(3300,()=>{
    console.log("server is running");
});
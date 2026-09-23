const express=require('express');
const session=require('express-session');
const app=express();

app.use(express.json());
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
)

const loginHandler=require('./login.js');
app.get('/login',loginHandler);

const homeHandler=require('./homepage.js');
app.get('/',homeHandler);

const processHandler=require('./processpage.js');
app.post('/process-login',processHandler);

const logoutHandler=require('./logout.js');
app.get('/logout',logoutHandler);

app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000");
})
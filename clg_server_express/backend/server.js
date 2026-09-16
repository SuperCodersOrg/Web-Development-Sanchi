const express=require('express');
const fs=require('fs');
let path=require('path');
const app=express();
const port=2300;

app.use(express.json());

app.get('/home',(req,res)=>{
    let data=fs.readFileSync('../data/home.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/home.html'));
});

app.get('/about',(req,res)=>{
    let data=fs.readFileSync('../data/about.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/about.html'));
});

app.get('/contact',(req,res)=>{
    let data=fs.readFileSync('../data/contact.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/contact.html'));
});

app.get('/courses',(req,res)=>{
    let data=fs.readFileSync('../data/courses.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/courses.html'));
});

// app.get('/courses/:course',(req,res)=>{
//     console.log(req.params.course);
//     res.sendFile(path.join(__dirname+`/../frontend/${req.params.course}.html`));
// });

app.get('/facilities',(req,res)=>{
    let data=fs.readFileSync('../data/facilities.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/facilities.html'));
});

app.get('/students',(req,res)=>{
    let data=fs.readFileSync('../data/students.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/students.html'));
});

app.get('/placement',(req,res)=>{
    let data=fs.readFileSync('../data/placement.json','utf8');
    res.send(data);
    // res.sendFile(path.join(__dirname+'/../frontend/placement.html'));
});

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.send('login page');
// });

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
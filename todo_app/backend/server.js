const express=require('express');
const cors=require('cors');
const app=express();
const path=require('path');
const fs=require('fs');
const port =3500;

app.use(express.json());
app.use(cors());

app.get('/get',(req,res)=>{
    let pathOfFile=path.join(__dirname,'..','data','data.json');
    let data=fs.readFileSync(pathOfFile,'utf8');
    res.send(data);
});

app.post('/post',(req,res)=>{
    console.log(req.body);
    let pathOfFile=path.join(__dirname,'..','data','data.json');
    let data=fs.readFileSync(pathOfFile,'utf8');
    let tasks=JSON.parse(data);
    tasks.push(req.body);
    fs.writeFileSync(pathOfFile,JSON.stringify(tasks),'utf8');
})

app.delete('/delete/:id',(req,res)=>{
    let id1=Number(req.params.id);
    let pathOfFile=path.join(__dirname,'..','data','data.json');
    let tasks=JSON.parse(fs.readFileSync(pathOfFile,'utf8'));
    // let newData=tasks.filter((task)=>{
    //     if(task.id === id1){
    //         task.delete_status=true;
    //     }
    //     // return task.id !== id1 ;
    // })
    tasks.forEach(element => {
        if(element.id === id1){
            element.delete_status=true;
        } 
    });
    fs.writeFileSync(pathOfFile,JSON.stringify(tasks),'utf8');
})

app.patch('/patch/:id',(req,res)=>{
    let pathOfFile=path.join(__dirname,'..','data','data.json');
    let data=JSON.parse(fs.readFileSync(pathOfFile,'utf8'));
    let id=Number(req.params.id);
    data.forEach((task)=>{
        if(task.id === id){
            task.status = req.body.status;
        }
    });
    fs.writeFileSync(pathOfFile,JSON.stringify(data),'utf8');
    res.send(data);
});

app.put('/edit/:id',(req,res)=>{
    console.log(req.body);
    let id=Number(req.params.id);
    let pathOfFile=path.join(__dirname,'..','data','data.json');
    let data=JSON.parse(fs.readFileSync(pathOfFile,'utf8'));
    data.forEach((item)=>{
        if(item.id === id){
            item.title = req.body.title;
            item.description = req.body.description
        }
    });
    fs.writeFileSync(pathOfFile,JSON.stringify(data),'utf8');
    res.send(data);
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
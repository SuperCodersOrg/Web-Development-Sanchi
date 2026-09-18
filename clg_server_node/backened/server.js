const http=require('http');
const fs=require('fs');
const path=require('path');
const port=1300;

const server=http.createServer((req,res)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let parts = req.url.split('/');
    if(req.url === '/' || req.url === '/home'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/home.json','utf8');
        res.end(data);
    }else if(req.url === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/about.json','utf8');
        res.end(data);
    }else if(req.url === '/courses'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/courses.json','utf8');
        res.end(data);
    }else if(parts[1] === 'courses'){
        let course = parts[2];
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync(`../data/${course}.json`,'utf8');
        res.end(data);
    }else if(req.url === '/students'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/students.json','utf8');
        res.end(data);
    }else if(parts[1]==='students'){
        if(parts[2]==='register' && req.method==='POST'){
            res.statusCode=200;
            let data=' ';
            req.on('data',(chunk)=>{
                data += chunk;
                console.log(data);
            });
            req.on('end',()=>{
                const dataPath=path.join(__dirname,'..','data','students_details.json');
                let tasks=JSON.parse(fs.readFileSync(dataPath,'utf8'));
                tasks.push(data);
                fs.writeFileSync(dataPath, JSON.stringify(tasks), 'utf8');
            })
            res.end("Successfully registered");
        }
    }else if(req.url === '/contact'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/contact.json','utf8');
        res.end(data);
    }else if(req.url === '/facilities'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/facilities.json','utf8');
        res.end(data);
    }else if(req.url === '/placement'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/placement.json','utf8');
        res.end(data);
    }else{
        res.statusCode = 404;
        // res.setHeader('Content-Type' , 'application/json');
        // let data = fs.readFileSync('../frontend/unknown.json','utf8');
        res.end('page not found');
    }

});

server.listen(port,()=>{
    console.log("Server is running on port ",port);
})
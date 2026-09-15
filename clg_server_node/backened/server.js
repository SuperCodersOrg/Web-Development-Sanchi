const http=require('http');
const fs=require('fs');
const port=3130;

const server=http.createServer((req,res)=>{

    let parts = req.url.split('/');
    if(req.url === '/api/' || req.url === '/api/home'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/home.json','utf8');
        res.end(data);
    }else if(req.url === '/api/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/about.json','utf8');
        res.end(data);
    }else if(req.url === '/api/courses'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/courses.json','utf8');
        res.end(data);
    }else if(parts[2] === 'courses'){
        let course = parts[3];
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync(`../data/${course}.json`,'utf8');
        res.end(data);
        // if(parts[2]==='bca'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type','text/html');
        //     let data = fs.readFileSync('../frontend/bca.html','utf8');
        //     res.end(data);
        // }else if(parts[2]==='bba'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type','text/html');
        //     let data = fs.readFileSync('../frontend/bba.html','utf8');
        //     res.end(data);
        // }
        // else if(parts[2]==='btech'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type','text/html');
        //     let data = fs.readFileSync('../frontend/btech.html','utf8');
        //     res.end(data);
        // }
        // else if(parts[2]==='ai'){
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type','text/html');
        //     let data = fs.readFileSync('../frontend/ai.html','utf8');
        //     res.end(data);
        // }
    }else if(req.url === '/api/students'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/students.json','utf8');
        res.end(data);
    }else if(parts[2]==='api/students'){
        if(parts[3]==='register' && req.method==='GET'){
            res.statusCode = 200;
            res.setHeader('Content-Type' ,'application/json');
            let data = fs.readFileSync('../data/form.json','utf8');
            res.end(data);
        }else if(parts[3]==='register' && req.method==='POST'){
            res.statusCode=200;
            console.log(req.data);
            res.end("Successfully registered");
        }
    }else if(req.url === '/api/contact'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/contact.json','utf8');
        res.end(data);
    }else if(req.url === '/api/facilities'){
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        let data = fs.readFileSync('../data/facilities.json','utf8');
        res.end(data);
    }else if(req.url === '/api/placement'){
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
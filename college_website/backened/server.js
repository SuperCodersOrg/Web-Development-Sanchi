const http=require('http');
const fs=require('fs');
const port=2100;

const server=http.createServer((req,res)=>{

    let parts = req.url.split('/');
    if(req.url === '/' || req.url === '/home'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/home.html','utf8');
        res.end(data);
    }else if(req.url === '/about'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/about.html','utf8');
        res.end(data);
    }else if(req.url === '/courses'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/courses.html','utf8');
        res.end(data);
    }else if(parts[1] === 'courses'){
        if(parts[2]==='bca'){
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/bca.html','utf8');
            res.end(data);
        }else if(parts[2]==='bba'){
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/bca.html','utf8');
            res.end(data);
        }
        else if(parts[2]==='btech'){
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/btech.html','utf8');
            res.end(data);
        }
        else if(parts[2]==='ai'){
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/ai.html','utf8');
            res.end(data);
        }
    }else if(req.url === '/students'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/students.html','utf8');
        res.end(data);
    }else if(parts[1]==='students'){
        if(parts[2]==='register'){
            res.setHeader('Content-Type' ,'text/html');
            let data = fs.readFileSync('../frontend/form.html','utf8');
            res.end(data);
        }
    }else if(req.url === '/contact'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/contact.html','utf8');
        res.end(data);
    }else if(req.url === '/facilities'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/facilities.html','utf8');
        res.end(data);
    }else if(req.url === '/placement'){
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/placement.html','utf8');
        res.end(data);
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type' , 'text/html');
        let data = fs.readFileSync('../frontend/unknown.html','utf8');
        res.end(data);
    }

});

server.listen(port,()=>{
    console.log("Server is running on port ",port);
})
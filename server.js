const http = require('http');
let users = [];

const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.setHeader('Content-Type',"text/html");
        res.write("<h1>Welcome to Node JS</h1>");
        res.write(`<form action=/create-user method='POST'>`);
        res.write("<input name=user type='text'>");
        res.write("<button type='submit'>POST</button>")
        res.write("</form>");
       
        res.end();

    }else if(req.url==='/create-user'&&req.method==="POST"){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
            users.push(user);
            res.statusCode=302;
        res.setHeader('Location','/user');
        res.end();
        });
        
    }else if(req.url==="/user"){
        console.log(users);
        res.write("<h1>Welcome to Node Users</h1>");
        res.write("<div><ul>");
        users.map((user)=>{
            res.write(`<li>${user}</li>`);
        });
        res.write("</ul></div>");
       
    }
});
server.listen(3000,()=>{
    console.log("Server is listenting on Port 3000");
});

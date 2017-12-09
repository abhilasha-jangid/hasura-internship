var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const http = require('http');
var path = require('path');
var app = express();



app.use(morgan('dev'));
var posts = require('./routes/posts');
app.use('/posts',posts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/' , function(req,res)
{
    res.send('hello world- abhilasha');
})

app.get('/setCookie',function(req,res)
{
    var  name = 'abhilasha';
    var  age = 10;
    var cookie1 = req.cookies.name;
    var cookie2 = req.cookies.age;

    if (cookie1 === undefined && cookie2 === undefined)
    {
        res.cookie('name',name,{ maxAge: 900000, httpOnly: true });
        res.cookie('age',age,{ maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
        res.send('new cookie has been send');
    }
    else
    {
        res.send('cookie already exist');
    }
})
app.get('/clearcookie',function(req,res)
{
    var cookie1 = req.cookies.name;
    var cookie2 = req.cookies.age;
    console.log(cookie1);
    console.log(cookie2);
    if(cookie1 === undefined && cookie2 === undefined)
    {
        res.send('cookie not exist');
    }
    else
    {
        res.clearCookie('name');
        res.clearCookie('age');
        res.send('cookie has been deleted');
    }
})
app.get('/showCookies',function(req,res)
{
    var cookie1 = req.cookies.name;
    var cookie2 = req.cookies.age;
    console.log(cookie1);
    console.log(cookie2);
    if(cookie1 === undefined && cookie2 === undefined)
    {
        res.send('cookie not exist');
    }
    else
    {
        res.send(cookie1 + cookie2);
    }
})
const option = {
    hostname: 'httpbin.org',
    port: 443,
    path: '/deny',
    method: 'GET'
  };
app.get('/robot.txt',function(req,res)
{
    r = http.request(option ,function(resp)
    {
        output = ''
          console.log('STATUS:', +resp.statusCode);
          resp.on('data',function(chunk)
          {
          //  console.log('a new chunk',chunk)
            output += chunk
          });
          resp.on('end',function()
        {
            res.json(
                {
                   "message" :
                   {
                     "data" :  output
                   }
              })
          console.log('END GET REQUEST')
        });
    })
    r.on('error',function(err)
    {
          console.log('Error: ',err)
    })
    r.end()
})
app.get('/page.html',function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'page.html'));
})
app.post('/input',function(req,res)
{
    var input = req.body.input;
    console.log(input);
    res.send(input);
})
app.listen(8080,function()
{
    console.log('server listen on port 8080');
})

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
const https = require('https');
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/users',
  method: 'GET'
};

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/' , function(req,res)
{
    res.send('hello world- abhilasha');
})
app.get('/users',function(req,res)
{
   r = https.request(options ,function(resp){
    output = ''
    username=[]
    console.log('STATUS:',resp.statusCode);
    resp.on('data',function(chunk)
    {
      console.log('a new chunk',chunk)
      output += chunk
    });
    resp.on('end',function()
  {
    var users = JSON.parse(output);
    for(var i=0;i<users.length;i++)
    {
      username.push(users[i]["name"]);
    }
    res.json(
      {
         "message" :
         {
           "data" : username
         }
    });
    console.log('END GET REQUEST')
  });
  })
  r.on('error',function(err)
  {
    console.log('Error: ',err)
  })
  r.end()
})

app.listen(8080,function()
{
    console.log('server listen on port 8080');
})

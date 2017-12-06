var express = require('express');
var bodyParser = require('body-parser');
var postRoutes = express.Router();
const https = require('https');
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/posts',
  method: 'GET'
};
const option = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/users',
  method: 'GET'
};

postRoutes.get('/users',function(req,res)
{
       r = https.request(option ,function(resp){
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
postRoutes.get('/posts',function(req,res)
{
       r = https.request(options ,function(resp){
        output = ''
        postdis=[]
        console.log('STATUS:',resp.statusCode);
        resp.on('data',function(chunk)
        {
          console.log('a new chunk',chunk)
          output += chunk
        });
        resp.on('end',function()
      {
        var posts = JSON.parse(output);
        for(var i=0;i<posts.length;i++)
        {
          postdis.push(posts[i]["body"]);
        }
        res.json(
          {
             "message" :
             {
               "data" :  postdis
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
module.exports = postRoutes;

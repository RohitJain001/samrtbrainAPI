const express = require ('express');
const bodyParser = require('body-parser');
var passwordHash = require('password-hash');
const cors = require('cors');
var knex = require('knex');

const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image');


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });
const app=express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{
 res.send("it is working")
})

app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,passwordHash)})

app.post('/register',(req, res)=>{register.handleRegister(req, res, db,passwordHash)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
 console.log(`app is running on port ${process.env.PORT}`)
})
const express = require('express');
const mongoose = require('mongoose');
// import cookie parser
const cookieParser = require('cookie-parser');

// import require auth
const {requireAuth} = require('./middleware/authMiddleware')

// import authRoutes
const authRoutes = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
// below allows us to use JSON in our requests
app.use(express.json());
// allows us to use cookieParser as middleware
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://david:Looping!@nodeauth.uj5ph.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

// allow us to import are authroutes into the app.js file.
app.use(authRoutes)

// cookies routes
// app.get('/set-cookies', (req, res) =>{
//   // res.setHeader('Set-Cookie','newUser=true')

//   // npm install cookie-parser
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {maxAge:1000*60*60*24, httpOnly:true});
//   res.send('you got the cookies!');
// });


// app.get('/read-cookies', (req, res) =>{
//   const cookies = req.cookies;
//   console.log(cookies)

//   res.json(cookies)
// });
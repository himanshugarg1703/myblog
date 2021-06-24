/* if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} */

// getting express
const express = require('express')
const app = express()

// setting port
const port = process.env.PORT || 5000
app.listen(port)

const path = require('path')

// for database
const mongoose = require('mongoose')

// from
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,
useUnifiedTopology: true, useCreateIndex: true})

// getting the article model
const Article = require('./models/article')

// from
const bodyParser = require('body-parser');
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
const User = require('./models/user')
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

/*
// getting the user model
const User = require('./models/user')

// for user authentication
const bcrypt = require('bcrypt'); 

const flash = require('express-flash')
const session = require('express-session')

const passport = require('passport')
const initializePassport = require('./passport-config')
initializePassport(
    passport,
) */

// for methods such as delete
const methodOverride = require('method-override')

// setting view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// getting the router for articles we made.
const articlerouter = require('./routes/articles')

// so that we can access all of the parameters from our article form inside our article route using req.body
app.use(express.urlencoded({extended:false})) // this needs to come first before app.use(/articles,articlerouter)

/*
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session()) */


// for methods such as delete
app.use(methodOverride('_method'))

app.get('/aboutme', async(req,res)=>{
    res.render('aboutme');
})

app.get('/login', async(req,res)=>{
    res.render('login');
})

app.get('/register', async(req,res)=>{
    res.render('register');
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),  function(req, res) {
	res.send('logged in successfully :)');
});

/*
app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // here the user should get to his/her profile page ???
    failureRedirect: '/login',
    failureFlash: true
}) ) 

// for saving the user account when form in register.ejs is submitted
app.post('/register', async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        await user.save()
        //res.send('User Registered Successfully!!')
        res.redirect('/login')
    }
    catch(e){
        // /register is incorrect here ******
        res.send('Error Occurred')
        res.render('register')
    }
}) */

// Home Page
app.get('/', async (req,res)=>{
    //res.send('Hello World')
    /* const articles = [{
        title : 'test title',
        createdAt: new Date(),
        description: 'test description'
    }] */
    const articles = await Article.find().sort({
        title: 'asc'
    })
    // render is going to access our views folder
    res.render('articles/index', {articles : articles})
})



// telling our app to use this router
app.use('/articles',articlerouter) /* now everything we create in articlerouter will be with respect to /articles. */
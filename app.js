const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var bodyParser = require('body-parser');
const hbs1 = require('nodemailer-express-handlebars');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const db = require('./connection/get_connect')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));
app.use(bodyParser.json({ limit: "50mb" }));


app.use('/', indexRouter);
app.use('/admin', adminRouter);
// catch 404 and forward to error handler
const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quiet,it\'asecret!',
    SESS_LIFETIME = TWO_HOURS } = process.env

const IN_PROD = NODE_ENV === 'production'

const users = [
    { id: 1, email: 'thenewcity', password: '123'}
]

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}));

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login')
    }else{
        next()
    }
}

const redirectAdmin = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/admin/home')
    }else{
        next()
    }
}

app.get('/admin', redirectLogin, adminRouter);
app.get('/login', redirectAdmin, (req, res) => {
    res.render('authen/login',{layout:'authen/layout'});
})
app.post('/login', redirectAdmin, (req, res) => {
    const { email, password } = req.body

    if (email && password ) {
        const user = users.find(user => user.email === email && user.password === password
        )
        if (user) {
            req.session.userId = user.id
            return res.redirect('/admin/home')
        }
    }
    
    res.redirect('login')
})


app.use(function(req, res, next) {
    next(createError(404));
});

//get connect database
db.connect()

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});





module.exports = app;
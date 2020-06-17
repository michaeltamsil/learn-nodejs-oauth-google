var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');

var app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5500'
}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:"shh, its a secret!",
    cookie: {
        secure: false
    }
}));

app.get("/", (req, res) => {
    if(req.session.pages_views){
        req.session.pages_views++;
        res.send("you visited this page" + req.session.pages_views+"times")
    }else {
        req.session.pages_views = 1;
        res.send("welcom to this page for the first time!");
    }
});


app.listen(3002);
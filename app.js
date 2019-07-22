const express       = require('express');
const path          = require('path');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const passport      = require('passport');


var app           = express();
var port          = 7700;


const filePath    = "/BlocklyLibrarySystem/blockly/tests";

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/BlocklyLibrarySystem"));
app.use(express.static(__dirname + "/BlocklyLibrarySystem/blockly"));
app.use(express.static(__dirname + "/BlocklyLibrarySystem/blockly/core"));
app.use(express.static(__dirname + "/BlocklyLibrarySystem/blockly/tests"));

//app.use(express.static(__dirname + "/BlocklyLibrarySystem/closure-library/"));


app.use(session({
    //secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', __dirname + filePath);
app.engine('html' ,require('ejs').renderFile);

module.exports = app;

app.get('/', (req,res) => {
    res.render('playground.html');
});

app.listen(app.get('port'), ()=>{
    console.log(__dirname);
    console.log('server connected');
});


var express= require('express');
var app = express();
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

var bodyparser = require('body-parser');
 //app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended:true}));

 var table = require('C://Users//Sanket//Desktop//AppChallenge//form-validation//src//table.js');

// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET","POST","OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin","Accept","Content-type");
//     next()
//   });



app.use('/create',function(req,res){
    // var query = req.query;
    var newPerson = new table({
        name: req.body.name,
        city: req.body.city,
        phonenumber: req.body.phonenumber,
        website: req.body.website,
        about: req.body.about
    });
    newPerson.save(function(err){
        if(err){
            res.type('html').status(500);
            res.send('Error: ' + err)
        }
        else{
            res.render('C:/Users/Sanket/Desktop/AppChallenge/form-validation/src/views/created', {person: newPerson})
        }
    });
    
});

app.use ('/all',(req, res) => {
    table.find((err, allPeople) => {
        if(err) {
            res.type('html').status(500);
            res.send('Error: ' + err)
        }
        else if (allPeople.length == 0) {
            res.type('html').status(200);
            res.send('There are no recoed');
        }
        else {
            res.render('C:/Users/Sanket/Desktop/AppChallenge/form-validation/src/views/ShowAll', {people: allPeople});
        }
    });
});

app.use('/person', (req,res) => {
     var searchName = req.query.name;
     table.findOne({name:searchName },(err, person) => {
        if(err) {
            res.type('html').status(500);
            res.send('Error: ' + err);
        }
        else if(!person) {
            res.type('html').status(200);
            res.send('No Person named ' + searchName);
        }
     else {
            res.render('C:/Users/Sanket/Desktop/AppChallenge/form-validation/src/views/personInfo', {person : person});
        }
     });
});

app.use('/update', (req, res) => {
     var updateName = req.body.name;
     table.findOne({name: updateName},(err, person) => {
        if(err) {
            res.type('html').status(500);
            res.send('Error: ' + err);
        }
        else if(!person) {
            res.type('html').status(200);
            res.send('No Person named ' + updateName);
        }
        else {
            person.city = req.body.city,
            person.phonenumber = req.body.phonenumber,
            person.website = req.body.website,
            person.about = req.body.about

            person.save((err) => {
                if(err){
                    res.type('html').status(500);
                    res.send('Error: ' + err)
                }
                else{
                    res.render('C:/Users/Sanket/Desktop/AppChallenge/form-validation/src/views/updated', {person: person})
                }
            });
        }
     });
}

);

app.use('/delete', (req,res) => {
    var searchName = req.query.name;
    table.deleteOne({name:searchName},(err,person) => {
        if(err) {
            res.type('html').status(500);
            res.send('Error: ' + err);
        }
        else if(!person) {
            res.type('html').status(200);
            res.send('No Person named ' + searchName);
        }
        else {
            res.render('C:/Users/Sanket/Desktop/AppChallenge/form-validation/src/views/deleted', {person : person});            
        }
    });
});

app.use('/public', express.static('public'));

app.use('/',function(req,res){
    res.send('Hello Sanket');
});

app.listen(5000, function(){
    console.log('LIstening to 5000');
});

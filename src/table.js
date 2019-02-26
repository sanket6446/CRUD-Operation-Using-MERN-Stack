var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MyEffect', {useNewUrlParser: true});

var Schema =  mongoose.Schema;
 var tableentry =  new Schema({
    name : {type:String, required:true},
    city : {type:String, required:true},
    phonenumber : {type:Number, required:true},
    website : {type:String},
    about : {type:String}
});
module.exports =   mongoose.model('table', tableentry);


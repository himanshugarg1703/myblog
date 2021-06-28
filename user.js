// getting mongoose
const mongoose = require('mongoose')

// from
const passportLocalMongoose = require('passport-local-mongoose');
/*mongoose.connect('mongodb://localhost/users',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});*/

// so that we can render html
const marked = require('marked')

// so that we can title slug instead of id
const slugify = require('slugify')

const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

// creating our article schema
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        // to have unique slug WOW!!!
        unique: true
    }
})

// done when any user is created, updated, deleted, etc..
userschema.pre('validate', function(next){
    if(this.name)
    {
        this.slug = slugify(this.name, {lower:true, strict:true})
    }

    next()
})

// from
userschema.plugin(passportLocalMongoose);

// exporting our user model
module.exports = mongoose.model('user', userschema)
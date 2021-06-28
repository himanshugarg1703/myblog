// getting mongoose
const mongoose = require('mongoose')

// so that we can render html
const marked = require('marked')

// so that we can title slug instead of id
const slugify = require('slugify')

const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

// creating our article schema
const articleschema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date:{
        type: String
    },
    description:{
        type:String,
        required:true
    },
    slug:{
        type: String,
        required: true,
        // to have unique slug WOW!!!
        unique: true
    },
    sanitizedHtml:{
        type: String,
        required: true
    }
})

// done when any article is created, updated, deleted, etc..
articleschema.pre('validate', function(next){
    if(this.title)
    {
        this.slug = slugify(this.title, {lower:true, strict:true})
    }

    if(this.description)
    {
        this.sanitizedHtml = dompurify.sanitize(marked(this.description))
    }

    next()
})

// exporting our article model
module.exports = mongoose.model('article', articleschema)
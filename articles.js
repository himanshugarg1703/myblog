// getting express
const express = require('express')

// getting router, it will give us same capability as app
const router = express.Router()

// get our article model
const Article = require('./../models/article')

// exporting this router so that we can tell our app to use it.
module.exports = router

// it will require to have a DELETE method for which we use method-override library.
router.delete('/:id', async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

// for route 5000/articles/ = 5000/articles
router.get('/', (req,res)=>{
    res.send('In articles')
})

// for route 5000/articles/new
router.get('/new', (req,res)=>{
    // render will look into the views folder
    // empty article is passed since we are pre-populating
    res.render('articles/new', {article: new Article()})
})

// async is used outside since the internal functions used are async
router.get('/:slug', async(req,res)=>{
    // res.send('helll')
    // findOne because find returns an array
    const article = await Article.findOne({ slug : req.params.slug })
    if(article==null) res.redirect('/')
    res.render('articles/show', {article : article})
})

router.get('/edit/:id', async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

// for posting new article when form in new.ejs is submitted by a user.
router.post('/', async(req,res,next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.date = new Date()
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`) 
        } catch(e){
            res.render(`articles/${path}`, {article : article}) // to prefill the previous text
        }
    }
}
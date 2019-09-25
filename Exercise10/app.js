const express = require('express')
const bodyParse = require('body-parser')
const form_function = require('./function_form')
const aws_function = require('./function_aws')
const app = express()
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extends: true}))

app.get('/', function(req,res){
    form_function.searchform(res)
    aws_function.getAllItems(res)
})
app.get('/search', function(req,res){
    console.log(req.query)
    const { newsTitle } = req.query
    if(!newsTitle){
        res.writeHead(302, {'Location': '/'})
        res.end()
    }else{
        form_function.displaySearchForm(res)
        aws_function.searchItem(newsTitle,res)
    }
    
})
app.get('/new', function(req,res){
    form_function.createNewForm(res)
    res.end()
})
app.post('/create', function(req,res){
    // console.log(req.body)
    // const { newsTitle, publishDate, content, image, authorTitle, authorName, authorAddress } = req.body
  aws_function.createItem( req.body , res);
})
app.get('/delete', function(req,res){
    const { id, newsTitle } = req.query
  aws_function.deleteItem(id, newsTitle, res);
})
app.get('/edit', function(req,res){
    form_function.displayEditForm(req.query, res)
    console.log(req.query)
})
app.post('/save', function(req,res){
    console.log(req.body)
    aws_function.updateItem(req.body, res);
})
app.listen(9999,function () {
    console.log('ok')
})
var port = 9999;
const express = require('express')
const bodyParser = require('body-parser') ;
var form_function = require('./Function_form'); // Các hàm xử lý giao diện
var aws_function = require('./Function_aws'); // Các hàm thao tác với NoSQL

const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //
const server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port

  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});
app.get('/', function (req, res) {

  form_function.displaySearchForm(res);
  aws_function.getAllItems(res);
})
app.post('/search', function (req, res) {
  const { year, name } = req.body
  console.log(req.body);
  if (!year && !name) {
    res.writeHead(302, { 'Location': '/' });
    res.end();
  }
  else {
    form_function.displaySearchForm(res);
    aws_function.searchItems(year, name, res);
  }
})
app.get('/new', function (req, res) {
  form_function.addNewForm(res);
  res.end();
})
app.post('/create', function (req, res) {
  const { year, name, type, author } = req.body
console.log(req.body, req.query)
  aws_function.createItem(year, name, type, author, res);
})
app.get('/edit', function (req, res) {
  const { year, name, type, author } = req.query
  form_function.editForm(year, name, type, author, res);
  res.end();
})
app.post('/save', function (req, res) {
  author = req.body.author
  const { year, name, type, author } = req.body
  aws_function.updateItem(year, name, type, author, res);
})
app.get('/delete', function (req, res) {
  const { year, name } = req.query
  aws_function.deleteItem(year, name, res);
})
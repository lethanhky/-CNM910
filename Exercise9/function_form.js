var fs = require('fs');
function displaySearchForm(res) {
    var data = fs.readFileSync('./Views/SearchForm.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}
function listTable(obj, res) {
    let tableHeader = '<table border="1px solid black"><tr><th>Year</th><th>Book name</th><th>Book type</th><th>Author</th><th> <a href="/new" >Create new</a></th></tr>';
    res.write(tableHeader);
    if (obj.err) {
        res.write('<h5 style="color:red;">Error:: ${obj.err}</h5>');
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
        if (obj.data.Items.length === 0) {
            res.write('<tr><td colspan="5">Nothing to show</td></tr>');
        }
        obj.data.Items.forEach((book) => {
            res.write(`<tr><td>${book.year}</td><td>${book.name}</td>
                        <td>${book.type}</td><td>${book.author}</td>
                        <td><a href="/edit?year=${book.year}&name=${book.name}&type=${book.type}&author=${book.author}">Edit</a>
                        <a href="/delete?year=${book.year}&name=${book.name}" >Delete</a></td></tr>`);
        });
    }
    res.write('</table>');
    res.end();
}
function addNewForm(res) {
    let data = fs.readFileSync('./Views/AddNewForm.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}
function editForm(year, name, type, author, res) {
    let data = fs.readFileSync('./Views/EditForm.html', 'utf-8');
    console.log("dataedit",data)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    data = replaceYearValue(data, year);
    data = replaceNameValue(data, name);
    data = replaceTypeValue(data, type);
    data = replaceAuthorValue(data, author);
    res.write(data);
}
function replaceYearValue(data, year) {
    let str = '<input name="year" type="text" readonly="readonly" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + `value="${year}" ` + data.substr(index);
}
function replaceNameValue(data, name) {
    let str = '<input name="name" type="text" readonly="readonly" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + `value="${name}" ` + data.substr(index);
}
function replaceTypeValue(data, type) {
    let str = '<input name="type" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + `value="${type}" ` + data.substr(index);
}
function replaceAuthorValue(data, author) {
    let str = '<input name="author" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + `value="${author}" ` + data.substr(index);
}
module.exports = {
    displaySearchForm: displaySearchForm,
    addNewForm: addNewForm,
    editForm: editForm,
    listTable: listTable
};
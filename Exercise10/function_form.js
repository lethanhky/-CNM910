const fs = require('fs')

function searchform(res) {
    var data = fs.readFileSync('./Views/searchform.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}

function listTable(obj, res) {
    let tableHeader = '<table border="1px solid black"><tr><th style="display:none">id</th><th>NewsTitle</th><th>Publish Date</th><th>Author</th><th>Image</th><th><a href="/new" >Create new</a></th></tr>';
    res.write(tableHeader);
    if (obj.err) {
        res.write('<h5 style="color:red;">Error:: ${obj.err}</h5>');
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
        if (obj.data.Items.length === 0) {
            res.write('<tr><td colspan="5">Nothing to show</td></tr>');
        }
        obj.data.Items.forEach((magazine) => {
            res.write(`<tr><td style="display:none">${magazine.id}</td><td>${magazine.newTitle}</td>
                        <td>${magazine.publishDate}</td><td><p>Name: ${magazine.author.authorName}</p>
                        <p>Title: ${magazine.author.authorTitle}</p>
                        <p>Address: ${magazine.author.authorAddress}</p></td>
                        <td><img style="width:30px; height:40px" src="${magazine.image}"/></td>
                        <td><a href="/edit?id=${magazine.id}&newTitle=${magazine.newTitle}&authorName=${magazine.author.authorName}&authorTitle=${magazine.author.authorTitle}&authorAddress=${magazine.author.authorAddress}&publishDate=${magazine.publishDate}&content=${magazine.content}&image=${magazine.image}">Edit</a>
                        <a href="/delete?id=${magazine.id}&newTitle=${magazine.newTitle}" >Delete</a></td></tr>`);
        });
    }
    res.write('</table>');
    res.end();
}
function createNewForm(res) {
    let data = fs.readFileSync('./Views/createform.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
}
function displayEditForm(body, res) {
    let data = fs.readFileSync('./Views/editform.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const { id, newTitle, content, publishDate, authorName, authorTitle, authorAddress, image } = body
    data = replaceIDValue(data, id);
    data = replaceNewsTiltleValue(data, newTitle);
    data = replaceContentValue(data, content);
    data = replaceImageValue(data, image);
    data = replacePublishDateValue(data, publishDate);
    data = replaceAuthorAddressValue(data, authorAddress);
    data = replaceAuthorNameValue(data, authorName);
    data = replaceAuthorTitleValue(data, authorTitle);
    res.write(data);
}
function replaceIDValue(data, id) {
    let str = '<input name="ID" type="text" readonly="readonly" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${id}" ` + data.substr(index);
}
function replacePublishDateValue(data, publishDate) {
    let str = '<input name="publishDate" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${publishDate}"` + data.substr(index);
}
function replaceNewsTiltleValue(data, newTitle) {
    let str = '<input name="newTitle" type="text" readonly="readonly" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${newTitle}"` + data.substr(index);
}
function replaceContentValue(data, content) {
    let str = '<input name="content" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${content}"` + data.substr(index);
}
function replaceImageValue(data, image) {
    let str = '<input name="image" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${image}"` + data.substr(index);
}
function replaceAuthorTitleValue(data, authorTitle) {
    let str = '<input name="authorTitle" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${authorTitle}"` + data.substr(index);
}
function replaceAuthorNameValue(data, authorName) {
    let str = '<input name="authorName" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${authorName}"` + data.substr(index);
}
function replaceAuthorAddressValue(data, authorAddress) {
    let str = '<input name="authorAddress" type="text" />';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${authorAddress}"` + data.substr(index);
}
module.exports = {
    listTable: listTable,
    searchform: searchform,
    createNewForm: createNewForm,
    displayEditForm: displayEditForm
} 
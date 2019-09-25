const AWS = require('aws-sdk')
const function_form = require('./Function_form')
const uuid = require('uuid/v1')
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
})

let docClient = new AWS.DynamoDB.DocumentClient()

function getAllItems(res) {
    let params = {
        TableName: "MAGAZINES"
    }
    let scanObject = {}
    docClient.scan(params, (err, data) => {
        if (err) {
            scanObject.err = err
        } else {
            // console.log("scan", data)
            scanObject.data = data
        }
        function_form.listTable(scanObject, res)
    })
}

function searchItem(newsTitle, res) { // scan or Create a Global Secondary Index
    let params = {
        TableName: "MAGAZINESS",
        FilterExpression: 'contains(#name , :n)',
        ExpressionAttributeNames: { "#name": "newTitle" },
        ExpressionAttributeValues: { ":n": newTitle }
    }
    let queryObject = {}
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err)
            queryObject.err = err;
        } else {
            // console.log(data)
            queryObject.data = data;
        }
        function_form.listTable(queryObject, res);
    })
}
function createItem(body, res) {
    const { newsTitle, publishDate, content, image, authorTitle, authorName, authorAddress } = body
    let params = {
        TableName: 'MAGAZINES',
        ConditionExpression: "attribute_not_exists(newsTitle) OR attribute_not_exists(id)",
        Item: {
            id: uuid(),
            newTitle: String(newTitle),
            publishDate: Date(publishDate),
            content: String(content),
            image: String(image),
            author: {
                authorTitle: String(authorTitle),
                authorName: String(authorName),
                authorAddress: String(authorAddress)
            }
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            function_form.addNewForm(res);
            res.write('<h5 style="color:red;">All fields are required!</h5>');
        }
        else {
            console.log(data)
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    });
}
function deleteItem(id, newsTitle, res) {
    let params = {
        TableName: 'MAGAZINES',
        Key: {
            "id": String(id),
            "newTitle": String(newTitle)
        }
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            res.writeHead(302, { 'Location': '/' })
        }
        res.end()
    });
}
function updateItem(body ,res) {
    const { id, newsTitle, publishDate, content, image, author } = body
    let params = {
        TableName: 'MAGAZINES',
        Key: {
            "id": String(id),
            "newTitle": String(newTitle)
        },
        UpdateExpression: "set #p = :publishDate, #a = :author, #c = :content, #i = :image",
        ExpressionAttributeNames: {
            '#p': 'publishDate',
            '#a': 'author',
            '#c': 'content',
            '#i': 'image'
        },
        ExpressionAttributeValues: {
            ':publishDate': Date(publishDate),
            ':content': String(content),
            ':author': String(author),
            ':image': String(image)
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            function_form.displayEditForm(body, res);
            res.write('<h5 style="color:red;">All fields are required!</h5>');
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    })
}

module.exports = {
    getAllItems: getAllItems,
    searchItem: searchItem,
    deleteItem: deleteItem,
    createItem: createItem,
    updateItem: updateItem
}
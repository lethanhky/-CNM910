const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});
// DATA_FILE = './data/bookdata.json';
let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');
let allBooks = JSON.parse(fs.readFileSync(__dirname + '/bookdata.json', 'utf-8'));
allBooks.forEach((book) => {
    let params = {
        TableName: "Books",
        Item: {
            "name": book.name,
            "year": book.year,
            "type": book.type,
            "author": book.author
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add book ${book.title}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`Book created ${book.name}`);
        }
    });
});
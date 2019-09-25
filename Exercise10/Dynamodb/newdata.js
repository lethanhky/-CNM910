const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');
let allMagazines = JSON.parse(fs.readFileSync(__dirname + '/magazine.json', 'utf-8'));
allMagazines.forEach((magazine) => {
    let params = {
        TableName: "MAGAZINES",
        Item: {
            "id": magazine.id,
            "newTitle": magazine.newTitle,
            "publishDate": magazine.publishDate,
            "image": magazine.image,
            "content": magazine.content,
            "author": {
                "authorTitle": magazine.author.authorTitle,
                "authorName": magazine.author.authorName,
                "authorAddress": magazine.author.authorAddress
            }
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add book ${magazine.newTitle}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`Book created ${magazine.newTitle}`);
        }
    });
});
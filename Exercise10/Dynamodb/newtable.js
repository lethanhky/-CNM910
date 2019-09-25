const AWS = require('aws-sdk')
const uuid = require('node-uuid')
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
})

let dynamodb = new AWS.DynamoDB()
let params = {
    TableName: "MAGAZINES",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "newTitle", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "newTitle", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error(`Something went wrong ${JSON.stringify(err, null, 2)}`);
    } else {
        console.log(`Created table ${JSON.stringify(data, null, 2)}`);
    }
});
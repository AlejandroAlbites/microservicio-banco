module.exports = {
    tables: [
      {
        TableName: `ServicesBankTable`,
        KeySchema: [{AttributeName: 'accountNumber', KeyType: 'HASH'}],
        AttributeDefinitions: [{AttributeName: 'accountNumber', AttributeType: 'S'}],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      // etc
    ],
  };
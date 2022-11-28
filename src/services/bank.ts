import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import { config } from '../config/dynamodb-local';
import { Card } from '../interfaces/card.interface';
import {
  validatePostParameters,
  validatePutParameters,
} from '../utils/validations.handle';

const dynamodb = new AWS.DynamoDB.DocumentClient(
  process.env.NODE_ENV === 'test' ? config : {}
);

const findCardsServices = async () => {
  const result = await dynamodb
    .scan({
      TableName: 'ServicesBankTable',
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(result.Items),
  };
};

const findCardByAccountNumberService = async (accountNumber?: string) => {
  const result = await dynamodb
    .get({
      TableName: 'ServicesBankTable',
      Key: {
        accountNumber,
      },
    })
    .promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Card not found.' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(result.Item),
  };
};

const updateAvailableMoneyService = async (
  accountNumber?: string,
  availableMoney?: string
) => {
  const updatedAt = new Date().toUTCString();

  const findCard = await findCardByAccountNumberService(accountNumber);
  if (findCard?.statusCode === 404) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Card not found. Could not update card',
      }),
    };
  }

  const validationMessage = validatePutParameters(availableMoney!);

  if (validationMessage != '') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: validationMessage }),
    };
  }

  const result = await dynamodb
    .update({
      TableName: 'ServicesBankTable',
      Key: {
        accountNumber,
      },
      UpdateExpression:
        'set availableMoney = :availableMoney, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':availableMoney': availableMoney,
        ':updatedAt': updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

const createCardService = async (
  accountNumber: string,
  availableMoney: string,
  typeCard: string
) => {
  const validationMessage = validatePostParameters(
    accountNumber,
    availableMoney,
    typeCard
  );

  if (validationMessage != '') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: validationMessage }),
    };
  }

  const createdAt = new Date().toUTCString();
  const id = v4();

  const newCard: Card = {
    id,
    accountNumber,
    availableMoney,
    typeCard,
    createdAt,
    updatedAt: createdAt,
  };

  await dynamodb
    .put({
      TableName: 'ServicesBankTable',
      Item: newCard,
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newCard),
  };
};
export {
  findCardsServices,
  findCardByAccountNumberService,
  updateAvailableMoneyService,
  createCardService,
};

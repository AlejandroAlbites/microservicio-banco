"use strict";
import * as AWS from "aws-sdk"
import { APIGatewayProxyEvent} from 'aws-lambda';
import {v4} from 'uuid'

import { Card } from './core/interfaces/card.interface';
const dynamodb = new AWS.DynamoDB.DocumentClient();


export const createCard = async (event: APIGatewayProxyEvent) => {

  const { accountNumber, availableMoney, typeCard} = JSON.parse(event.body as string)
  const createdAt = new Date().toUTCString();
  const id = v4()

  const newCard: Card = {
    id,
    accountNumber,
    availableMoney,
    typeCard,
    createdAt,
    updatedAt: createdAt
  }

  try {
    await dynamodb.put({
      TableName: "ServicesBankTable",
      Item: newCard
    }).promise()
  
    return {
      statusCode: 200,
      body: JSON.stringify(newCard),
    };
  } catch (error) {
    console.log(error);
  }

  
};

export const findCards = async () => {

let body;
try{
    body = await dynamodb.scan({
        TableName: "ServicesBankTable"
    }).promise()
    
} catch(error){
    console.log(error);
    
} finally {
    body = JSON.stringify(body)
}
const response = {
  statusCode: 200,
  headers: {
    "Content-type": "application/json",
  },
  body,
};

return response;
}

export const findCardByAccountNumber = async (event: APIGatewayProxyEvent) => {

  const accountNumber = event.pathParameters?.accountNumber

  let body

  try{
    body = await dynamodb.get({
        TableName: "ServicesBankTable",
        Key: {
          accountNumber
        }
      }).promise()
      
      if(!body.Item){
        return {
            statusCode: 404,
            body: JSON.stringify({message: "Card not found."})
        }
    }
   
} catch(error){
  console.log(error);
    
} finally {
    body = JSON.stringify(body?.Item)
}

const response = {
  statusCode: 200,
  headers: {
    "Content-type": "application/json"
  },
  body,
};

  return response;
};

export const updateAvailableMoney = async (event: APIGatewayProxyEvent) => {

  const {availableMoney} = JSON.parse(event.body as string);
  const accountNumber = event.pathParameters?.accountNumber
  const updatedAt = new Date().toUTCString();
  
  let body;

  try {

    const cardResult = await dynamodb.get({
      TableName: "ServicesBankTable",
      Key: {
        accountNumber
      }
    }).promise()

    if(!cardResult.Item){
      return {
          statusCode: 404,
          body: JSON.stringify({message: "Card not found."})
      }
  }

    body = await dynamodb.update({
      TableName: "ServicesBankTable",
      Key: {
        accountNumber
      },
      UpdateExpression: "set availableMoney = :availableMoney, updatedAt = :updatedAt",
      ExpressionAttributeValues: {
          ":availableMoney": availableMoney,
          ":updatedAt": updatedAt
      },
      ReturnValues: "ALL_NEW",
    }).promise()
    
    
  } catch (error) {
    console.log(error);
  }finally {
    body = JSON.stringify(body)
  }

  const response = {
    statusCode: 200,
    headers: {
      "Content-type": "application/json"
    },
    body,
  };

  return response;

}
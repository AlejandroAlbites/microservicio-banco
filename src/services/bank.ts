import * as AWS from "aws-sdk"
import {v4} from 'uuid'
import { Card } from '../interfaces/card.interface';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const findCardsServices = async () => {
    try {
        const result = await dynamodb.scan({
            TableName: "ServicesBankTable"
        }).promise()

        return result.Items
    } catch (error) {
        console.log(error);
    }
}

const findCardByAccountNumberService = async (accountNumber: string | undefined) => {

    try{
        const result = await dynamodb.get({
            TableName: "ServicesBankTable",
            Key: {
              accountNumber
            }
          }).promise()
          
          if(!result.Item){
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Card not found."})
            }
        }
        
        return {
            statusCode: 200,
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(result.Item)
        }
       
    } catch(error){
      console.log(error);
        
    } 

}

const updateAvailableMoneyService = async (accountNumber: string | undefined, availableMoney: string) => {

    const updatedAt = new Date().toUTCString();

    try {
        const findCard = await findCardByAccountNumberService(accountNumber)
        if( findCard?.statusCode === 404) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "Card not found. Could not update card"})
            }
        }

        const result = await dynamodb.update({
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

          return{
            statusCode: 200,
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(result)
          };

       
    } catch (error) {
        console.log(error);
    }
}

const createCardService = async ( accountNumber: string, availableMoney: string, typeCard: string) => {

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
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(newCard),
        };
      } catch (error) {
        console.log(error);
      }
}
export { findCardsServices, findCardByAccountNumberService, updateAvailableMoneyService, createCardService }
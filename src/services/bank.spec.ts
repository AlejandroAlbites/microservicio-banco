// const {DocumentClient} = require('aws-sdk/clients/dynamodb');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { config } from '../config/dynamodb-local';
import {
  createCardService,
  findCardByAccountNumberService,
  findCardsServices,
  updateAvailableMoneyService,
} from './bank';

const ddb = new DocumentClient(config);

it('should get a card', async () => {
  const newCard = {
    id: '1233',
    accountNumber: '123456789',
    availableMoney: '232',
    typeCard: 'soles',
    createdAt: '32-3-32',
    updatedAt: '23-3-23',
  };
  await ddb.put({ TableName: 'ServicesBankTable', Item: newCard }).promise();

  const result = await findCardByAccountNumberService('123456789');

  expect(result?.statusCode).toBe(200);
});

it('should fail to get a card', async () => {
  const result = await findCardByAccountNumberService('123456789dd');

  expect(result?.statusCode).toBe(404);
});

it('should get all cards', async () => {
  const newCard = {
    id: '1233',
    accountNumber: '123456789',
    availableMoney: '232',
    typeCard: 'soles',
    createdAt: '32-3-32',
    updatedAt: '23-3-23',
  };
  await ddb.put({ TableName: 'ServicesBankTable', Item: newCard }).promise();

  const result = await findCardsServices();

  expect(result?.statusCode).toBe(200);
});

it('should update a available money', async () => {
  const newCard = {
    id: '1233',
    accountNumber: '123456789',
    availableMoney: '232',
    typeCard: 'soles',
    createdAt: '32-3-32',
    updatedAt: '23-3-23',
  };
  await ddb.put({ TableName: 'ServicesBankTable', Item: newCard }).promise();

  const result = await updateAvailableMoneyService('123456789', '111232');

  expect(result?.statusCode).toBe(200);
});

it('should fail to update a available money', async () => {
  const result = await updateAvailableMoneyService('123456789ddd', '111232');

  expect(result?.statusCode).toBe(404);
});

it('should fail to update when a correct money number is not entered', async () => {
  const newCard = {
    id: '1233',
    accountNumber: '123456789',
    availableMoney: '232',
    typeCard: 'soles',
    createdAt: '32-3-32',
    updatedAt: '23-3-23',
  };
  await ddb.put({ TableName: 'ServicesBankTable', Item: newCard }).promise();
  const result = await updateAvailableMoneyService('123456789', 'ssss');

  expect(result?.statusCode).toBe(400);
});

it('should create a card', async () => {
  const result = await createCardService('123456789', '900', 'dolares');

  expect(result?.statusCode).toBe(200);
});

it('should fail when a correct card type is not entered', async () => {
  const result = await createCardService('123456789', '900', 'texto');

  expect(result?.statusCode).toBe(400);
});

it('should fail when an account is not entered correctly', async () => {
  const result = await createCardService('12345sdaa', '900', 'soles');

  expect(result?.statusCode).toBe(400);
});

it('should fail when a correct money number is not entered', async () => {
  const result = await createCardService('123456789', 'aaa', 'texto');

  expect(result?.statusCode).toBe(400);
});

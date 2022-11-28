'use strict';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  createCardService,
  findCardByAccountNumberService,
  findCardsServices,
  updateAvailableMoneyService,
} from '../services/bank';

export const createCard = async (event: APIGatewayProxyEvent) => {
  const { accountNumber, availableMoney, typeCard } = JSON.parse(
    event.body as string
  );

  try {
    const res = await createCardService(
      accountNumber,
      availableMoney,
      typeCard
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const findCards = async () => {
  try {
    const cards = await findCardsServices();

    return cards;
  } catch (error) {
    console.log(error);
  }
};

export const findCardByAccountNumber = async (event: APIGatewayProxyEvent) => {
  const accountNumber = event.pathParameters?.accountNumber;

  try {
    const res = await findCardByAccountNumberService(accountNumber);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailableMoney = async (event: APIGatewayProxyEvent) => {
  const accountNumber = event.pathParameters?.accountNumber;
  const { availableMoney } = JSON.parse(event.body as string);

  try {
    const res = updateAvailableMoneyService(accountNumber, availableMoney);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const validateAccount = (accountNumber: string) => {
  const re = /^[0-9]{9}$/;

  return re.test(accountNumber);
};

const validateAvailableMoney = (availableMoney: string) => {
  const re = /^\d*$/;

  return re.test(availableMoney);
};

const validateTypeCard = (typeCard: string) => {
  if (typeCard === 'soles' || typeCard === 'dolares') return true;

  return false;
};

export const validatePostParameters = (
  accountNumber: string,
  availableMoney: string,
  typeCard: string
) => {
  if (!validateAccount(accountNumber)) {
    return 'The account must contain only 9 numbers';
  }
  if (!validateAvailableMoney(availableMoney)) {
    return 'enter only numbers';
  }

  if (!validateTypeCard(typeCard)) {
    return 'The field only accepts soles and dolares';
  }

  return '';
};

export const validatePutParameters = (availableMoney: string) => {
  if (!validateAvailableMoney(availableMoney)) {
    return 'enter only numbers';
  }

  return '';
};

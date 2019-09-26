import _ from 'lodash';
import config from '../../config';

const validateName = fullName => {
  return fullName.length > 1 && /^[a-z ,.'-]+$/i.test(fullName)
    ? undefined
    : 'Invalid Format';
};

const validateNumber = number => {
  const errorMessage = 'Must be a number';
  return /^\d+$/i.test(number) ? undefined : errorMessage;
};

const validateEmail = email => {
  const errorMessage = 'Invalid email address';
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ? undefined
    : errorMessage;
};

const validatePassword = password => {
  const errorMessage = 'Must be 10 characters or longer';
  return password.length > 9 ? undefined : errorMessage;
};

const requiredFields = (fields, values) => {
  if (!_.isArray(fields)) {
    fields = [fields];
  }

  const errors = {};
  const errorMessage = 'Required';

  for (const field of fields) {
    if (!_.get(values, field)) {
      _.set(errors, field, errorMessage);
    }
  }

  return errors;
};

export default {
  validateName,
  validateNumber,
  validateEmail,
  validateGid,
  validatePassword,
  requiredFields,
};

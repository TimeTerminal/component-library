import PropTypes from 'prop-types';
import React from 'react';
import css from './styles.scss';

const FormError = props => <h5 className={css.error}>{props.error}</h5>;

FormError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default FormError;

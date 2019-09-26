import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import css from './styles.scss';
import SelectInput from '../selectInput';
import DateSelector from '../dateSelector';
import Text from '../text/Component';
import FileUpload from '../fileUpload';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';

const Label = styled(Text)`
  display: flex;
  width: 100%;
  margin: 0 0 10px 0;

  font-family: 'SuisseIntl-Regular', Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  color: #b0b0b0;
`;

const TextInput = styled.input`
  position: relative;
  z-index: 0;
  width: 100%;
  padding: 10px 20px 10px 10px;
  border: 1px solid #d8d8d8;
  border-radius: 2px;

  color: #1a191a;
  font-family: 'SuisseIntl-Regular';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;

  &::placeholder {
    width: 44px;
    height: 21px;
    font-family: SuisseIntl-Thin;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0px;
    color: $input-label-color;
  }
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 10px 20px 10px 10px;
  border: 1px solid #d8d8d8;
  border-radius: 2px;

  color: #1a191a;
  font-family: 'SuisseIntl-Regular';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;

  &::placeholder {
    width: 44px;
    height: 21px;
    font-family: SuisseIntl-Thin;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0px;
    color: $input-label-color;
  }
`;

export class FormField extends React.Component {
  render() {
    const {
      className,
      disabled,
      error,
      errorClassName,
      cols,
      hideValidation,
      icon,
      input,
      inputChildren,
      inputFieldID,
      inputProps,
      label,
      labelChildren,
      placeholder,
      rows,
      type,
      touched,
      warning,
    } = this.props;
    const inputClasses = className != '' ? className : css.input;

    let inputField;
    const onFocus = this.props.onFocus || _.noop;

    switch (type) {
      case 'text':
        inputField = (
          <TextInput
            id={inputFieldID}
            {...input}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
          />
        );
        break;
      case 'password':
        inputField = (
          <PasswordInput
            id={inputFieldID}
            {...input}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
            aria-hidden="true"
          />
        );
        break;
      case 'textarea':
        inputField = (
          <textarea
            id={inputFieldID}
            className={inputClasses}
            {...input}
            type={type}
            rows={rows}
            cols={cols}
            {...inputProps}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
          />
        );
        break;
      case 'select':
        inputField = <SelectInput {...this.props} className={className} />;
        break;
      case 'checkbox':
        inputField = (
          <input
            id={inputFieldID}
            className={css.formField__checkbox}
            {...input}
            type={type}
            {...inputProps}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
          />
        );
        break;
      case 'date':
        inputField = <DateSelector {...this.props} />;
        break;
      case 'file':
        inputField = <FileUpload {...this.props} />;
        break;
      default:
        inputField = (
          <input
            id={inputFieldID}
            className={inputClasses}
            {...input}
            type={type}
            {...inputProps}
            disabled={disabled}
            placeholder={placeholder}
            onFocus={onFocus}
          />
        );
    }

    const errorClass = errorClassName || css.error;

    return (
      <React.Fragment>
        <div>
          {label !== '' && <Label>{label}</Label>}
          {labelChildren}
        </div>
        <div className={css.innerContainer}>
          {inputField}
          {inputChildren}
          {icon && <FontAwesome name={icon} className={css.fontAwesome} />}

          {!hideValidation && (
            <div className={css.validationMessages}>
              {touched &&
                ((error && <span className={errorClass}>{error}</span>) ||
                  (warning && <span className={css.warning}>{warning}</span>))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

FormField.defaultProps = {
  inputProps: {},
  hidden: false,
};

FormField.propTypes = {
  className: PropTypes.string,
  noPadding: PropTypes.bool,
  icon: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  errorClassName: PropTypes.string,
  inputFieldID: PropTypes.string,
  onFocus: PropTypes.func,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  error: PropTypes.string,
  warning: PropTypes.string,
  inputProps: PropTypes.object,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  inputChildren: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  labelChildren: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  hideValidation: PropTypes.bool,
  clearError: PropTypes.bool,
};

export default FormField;

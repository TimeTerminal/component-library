import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './styles.scss';

class FileUpload extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const file = e.target.files.item(0);
    this.props.input.onChange(file);
    this.props.input.onBlur(file);
  }

  render() {
    const {
      input: { name, value },
      inputProps,
      disabled,
    } = this.props;
    const classes = [css.label, disabled ? css.disabled : ''];

    return (
      <label htmlFor={name} className={classes.join(' ')}>
        <span className={value ? css.fileName : css.labelText}>
          {value ? value.name : 'Select a file to upload'}
        </span>
        <input
          type="file"
          id={name}
          name={name}
          onChange={this.onChange}
          className={css.input}
          {...inputProps}
          disabled={disabled}
        />
      </label>
    );
  }
}

FileUpload.defaultProps = {
  inputProps: {},
  disabled: false,
};

FileUpload.propTypes = {
  input: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
};

export default FileUpload;

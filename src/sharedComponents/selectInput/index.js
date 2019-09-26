import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import css from './styles.scss';
import _ from 'lodash';

class SelectInput extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(value) {
    const newVal = value ? value.value : null;
    if (this.props.onChange) {
      this.props.onChange(newVal);
    } else {
      this.props.input.onChange(newVal);
    }
  }

  onBlur() {
    const {
      input: { onBlur, value },
    } = this.props;
    if (this.props.onBlur) {
      this.props.onBlur(value);
    } else {
      onBlur(value);
    }
  }

  render() {
    const props = this.props;
    const {
      input,
      defaultValue,
      value,
      options,
      optionsFn,
      async,
      className,
      searchable,
      specialClass,
    } = props;

    const classes = [
      css.select,
      _.get(css, className),
      _.get(css, specialClass),
    ];

    let select;
    if (async) {
      select = (
        <Select.Async
          {...props}
          defaultValue={defaultValue}
          value={input.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          loadOptions={optionsFn}
          className={classes.join(' ')}
          searchable={searchable || false}
        />
      );
    } else {
      select = (
        <Select
          {...props}
          defaultValue={defaultValue}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          options={options}
          className={classes.join(' ')}
          searchable={searchable || false}
        />
      );
    }

    return select;
  }
}

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array,
  async: PropTypes.bool,
  optionsFn: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

export default SelectInput;

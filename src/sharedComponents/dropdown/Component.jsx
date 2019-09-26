import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from '../text/Component';
import ReactSelect from 'react-select';

const StyledDropdown = styled(ReactSelect)`
  &&& {
    ${'' /* height: 45px;
    color: ${props => props.theme.colors.inputTextColor};
    font-family: 'SuisseIntl-Regular';
    font-size: 14px;
    font-weight: 500; */}
    background-color: blue;

    .Select-value {
      width: 100px;
      display: inline-flex;
      align-items: center;
      background-color: red;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
    background-color: green;
  }
`;

const Title = styled(Text)`
  padding-bottom: 5px;

  font-family: 'SuisseIntl-Regular', Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  color: ${props => props.theme.colors.inputLabelColor};
`;

export class Dropdown extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isFocused: false,
    };

    this.onFocus = this.onFocus.bind(this);
  }

  onFocus() {
    if (this.props.isDisabled) {
      return;
    }
    this.setState({ isFocused: true });
  }

  render() {
    const { isFocused } = this.state;
    const { title, input, isDisabled, isErrored, placeholder } = this.props;

    return (
      <React.Fragment>
        <Title
          position="absolute"
          py="2px"
          top="-7px"
          left={12}
          px="3px"
          fontSize={1}
          fontWeight="medium"
          color={isErrored ? 'negative' : 'black'}
          isFocused={(isFocused || input.value !== '') && !isDisabled}
        >
          {title}
        </Title>
        <StyledDropdown
          {...this.props}
          onChange={e => this.props.onChange(e.target.value)}
          value={input.value}
          placeholder={isDisabled ? title : placeholder}
          type="text"
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          isFocused={(isFocused || input.value !== '') && !isDisabled}
          disabled={isDisabled}
          isErrored={isErrored}
        />
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isErrored: PropTypes.bool,
};

export default Dropdown;

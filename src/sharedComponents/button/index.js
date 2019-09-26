import React from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: ${props =>
    props.iconPlacement === 'left' ? 'row-reverse' : 'row'};
  align-items: center;
  transition: all 0.25s ease-in-out;
  border: solid 1px #253ae4;
  -webkit-font-smoothing: true;
  outline: none;
  padding: ${props => (props.size === 'small' ? '1.8em 2em' : '1.8em 4em')};
  background-color: #253ae4;

  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 1.9px;
  line-height: 1;

  &:hover {
    cursor: pointer;
    background-color: #4f66ff;
    border: 1px solid #4f66ff;
  }

  &:active {
    outline: none;
    border: solid 1px #ffffff;
  }

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      color: white;
      background-color: #b2b2b2;
      border-color: #b2b2b2;

      &:hover {
        cursor: default;
        color: white;
        background-color: #b2b2b2;
        border-color: #b2b2b2;
      }
    `};
`;

const Icon = styled.span`
  margin: 0 5px;
`;

export const Button = props => {
  const {
    className,
    disabled,
    iconType,
    iconPlacement,
    id,
    handler,
    size,
    text,
    type,
  } = props;
  const classes = [className || ''];

  const handlerNoRefreshOnSubmit = event => {
    handler();
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return (
    <StyledButton
      id={id}
      type={type}
      className={classes.join(' ')}
      onClick={handlerNoRefreshOnSubmit}
      disabled={disabled}
      iconPlacement={iconPlacement}
      size={size}
    >
      <div>{text}</div>
      <Icon className={`fa fa-${iconType}`} />
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
  iconType: PropTypes.string,
  iconPlacement: PropTypes.string,
};

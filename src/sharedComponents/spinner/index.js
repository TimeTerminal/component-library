import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.scss';

const Spinner = props => {
  const { size, className, color } = props;
  const classes = [css.spinner, className || ''];

  const style = {};
  if (color) {
    style.stroke = color;
  }

  return (
    <svg
      className={classes.join(' ')}
      width={size}
      height={size}
      id="spinner"
      viewBox="0 0 50 50"
    >
      <circle
        className={css.path}
        style={style}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
};

Spinner.defaultProps = {
  size: 30,
};
Spinner.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.p`
  vertical-align: middle;
  margin: 0;
`;

Text.propTypes = {
  fontSize: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  fontWeight: PropTypes.oneOf(['bold', 'medium', 'regular']),
  lineHeight: PropTypes.string,
};

Text.defaultProps = {
  fontWeight: 'regular',
  lineHeight: '1',
};

export default Text;

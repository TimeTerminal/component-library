import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageTitle = props => {
  const { title } = props;

  const PageTitle = styled.h1`
    margin: 15px 25px 0;
    font-family: 'SuisseIntl-SemiBold';
    font-size: 32px;
    color: ${props => props.theme.colors.titlePrimary};
    text-transform: uppercase;
  `;

  return <PageTitle>{title}</PageTitle>;
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      titlePrimary: PropTypes.string.isRequired,
    }),
  }),
};

export default PageTitle;

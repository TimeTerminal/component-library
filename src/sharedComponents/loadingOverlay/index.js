import React from 'react';
import Spinner from '../spinner';
import css from './styles.scss';

const LoadingOverlay = () => (
  <div className={css.loadingOverlay}>
    <Spinner size={30} color="#215e64" />
  </div>
);

export default LoadingOverlay;

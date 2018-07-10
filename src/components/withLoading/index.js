import React from 'react';
import Loading from '../Loading';

const withLoading = Component => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};

export default withLoading;

const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  loginRoute: () => '/login',
  signupRoute: () => '/signup',
  chatRoute: () => '/',
};

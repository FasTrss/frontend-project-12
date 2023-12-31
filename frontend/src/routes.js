const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  loginRoute: () => '/login',
  signupRoute: () => '/signup',
  chatRoute: () => '/',
};

export default routes;

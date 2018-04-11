import { environment } from '../../../environments/environment';

export const AUTH_CONFIG = {
  clientID: 'oFfXrxqSipz8nGcK2d6tX8ZBltoBWic7',
  domain: 'stativka.eu.auth0.com',
  responseType: 'token id_token',
  audience: 'https://stativka.eu.auth0.com/userinfo',
  redirectUri: environment.production ? 'https://uctalks.github.io/' : 'http://localhost:4200/',
  scope: 'openid profile',
};

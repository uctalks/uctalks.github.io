import { environment } from '../../environments/environment';

export const restPrefix = environment.production
  ? 'https://uctalks.herokuapp.com'
  : 'https://uct-dev.herokuapp.com';

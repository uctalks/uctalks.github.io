import { environment } from '../../environments/environment';

export default environment.production
  ? 'https://uctalks.herokuapp.com'
  : 'https://uct-dev.herokuapp.com';

import { Auth0DecodedHash } from 'auth0-js';

export interface IAuthenticatedUser extends Auth0DecodedHash {
  readonly userId: string;
}

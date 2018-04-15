import { Observable } from 'rxjs/Observable';
import { Auth0DecodedHash } from 'auth0-js';
import { IAuthenticatedUser } from './authenticated-user.interface';

export interface IAuthService {
  readonly isAuthenticated: boolean;
  readonly token: string | null;
  readonly userProfileId: string | null;
  readonly userProfileName: string | null;
  readonly userProfilePicture: string | null;
  handleAuthentication(): Observable<Auth0DecodedHash>;
  login(): void;
  logout(): void;
  setSession(user: IAuthenticatedUser): void;
}

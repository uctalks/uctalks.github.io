import { Observable } from 'rxjs/Observable';

export interface IAuthService {
  readonly token: string | null;
  readonly userId: string | null;
  readonly userProfileName: string | null;
  readonly userProfilePicture: string | null;
  handleAuthentication(): Observable<string | null>;
  login(): void;
  logout(): void;
}

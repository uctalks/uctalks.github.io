import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, AuthorizeOptions } from 'auth0-js';
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';
import { map } from 'rxjs/operators';

import { AUTH_CONFIG } from './auth.config';
import { IAuthService } from './types';

@Injectable()
export class AuthService implements IAuthService {
  private readonly auth0 = new auth0.WebAuth(AUTH_CONFIG);

  public get token(): string | null {
    return localStorage.getItem('access_token');
  }

  public get userId(): string | null {
    return this.isAuthenticated ? localStorage.getItem('userId') : null;
  }

  public get userProfileName(): string | null {
    return localStorage.getItem('userName');
  }

  public get userProfilePicture(): string | null {
    return localStorage.getItem('userPicture');
  }

  private get isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public login(): void {
    /**
     * // TODO remove if possible
     * Cast options to AuthorizeOptions since prompt property is needed for
     * the google account selection but it is not present in AuthorizeOptions interface
     */
    const options = <AuthorizeOptions>{ connection: 'google-oauth2', prompt: 'select_account' };
    this.auth0.authorize(options);
  }

  public handleAuthentication(): Observable<string | null> {
    return bindNodeCallback<Auth0DecodedHash>(this.auth0.parseHash.bind(this.auth0))().pipe(
      map(authResult => {
        // parse url, if authResult is present
        if (authResult) {
          const { expiresIn, accessToken, idTokenPayload: { sub: userId } } = authResult;
          const expiresAt = JSON.stringify((expiresIn * 10000) + new Date().getTime());

          localStorage.setItem('expires_at', expiresAt);
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('userId', userId);

          window.location.hash = '';

          return userId;
        }

        // check if user is already logged in
        return this.userId;
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Auth0DecodedHash, AuthorizeOptions } from 'auth0-js';
import { Observable } from 'rxjs/Observable';
import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

import { AUTH_CONFIG } from './auth-config';
import { IAuthenticatedUser, IAuthService } from './types';

@Injectable()
export class AuthService implements IAuthService {
  private readonly auth0 = new auth0.WebAuth(AUTH_CONFIG);

  constructor(private readonly router: Router) {
  }

  public get isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public get userProfileId(): string | null {
    return localStorage.getItem('userId');
  }

  public get userProfileName(): string | null {
    return localStorage.getItem('userName');
  }

  public get userProfilePicture(): string | null {
    return localStorage.getItem('userPicture');
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

  public handleAuthentication(): Observable<Auth0DecodedHash> {
    return bindNodeCallback(this.auth0.parseHash.bind(this.auth0))();
  }

  public setSession({ expiresIn, accessToken, idToken, userId }: IAuthenticatedUser): void {
    const expiresAt = JSON.stringify((expiresIn * 10000) + new Date().getTime());
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('userId', userId);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }
}

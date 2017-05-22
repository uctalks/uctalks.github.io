import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';
import { MdSnackBar } from '@angular/material';
import { AUTH_CONFIG } from './auth-config';

@Injectable()
export class AuthService {
  // Configure Auth0
  public auth0 = new auth0.WebAuth(AUTH_CONFIG);

  constructor(public router: Router, private snackBar: MdSnackBar) {}

  public login(): void {
    // Call the show method to display the widget.
    this.auth0.authorize({ connection: 'google-oauth2', prompt: 'select_account' });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash(null, (err, authResult) => {
      if (err) {
        this.snackBar.open(err.errorDescription, 'close', { duration: 4000 });
        console.error(err);
      } else if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.snackBar.open('You are loggen in', 'close', { duration: 2000 });
      }
      this.router.navigate(['/']);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public get isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

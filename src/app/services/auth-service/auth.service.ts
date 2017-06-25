import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/bindNodeCallback';
import { Observable } from 'rxjs/Observable';
import auth0 from 'auth0-js';
import { MdSnackBar } from '@angular/material';
import { AUTH_CONFIG } from './auth-config';
import { UserService } from '../user-service/user.service';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import { UserIsLoggedInAction, UserIsNotLoggedInAction } from 'app/actions/users';

@Injectable()
export class AuthService {
  // Configure Auth0
  public auth0 = new auth0.WebAuth(AUTH_CONFIG);

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private store: Store<State>,
    private userService: UserService,
  ) { }

  public login(): void {
    // Call the show method to display the widget.
    this.auth0.authorize({ connection: 'google-oauth2', prompt: 'select_account' });
  }

  public handleAuthentication(): Observable<any> {
    return Observable.bindNodeCallback(this.auth0.parseHash.bind(this.auth0))();
  }

  public setSession({ expiresIn, accessToken, idToken, userId }): void {
    const expiresAt = JSON.stringify((expiresIn * 10000) + new Date().getTime());
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('userId', userId);
  }

  public logout(): void {
    // Remove tokens,expiry time and userId from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');

    // Go back to the home route
    this.router.navigate(['/home']);
  }

  public get isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public get userProfileId(): string | null {
    return localStorage.getItem('userId');
  }
}

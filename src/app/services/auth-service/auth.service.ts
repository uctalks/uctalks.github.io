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
    console.log('handleAuthentication');
    return Observable.bindNodeCallback(this.auth0.parseHash)();

    // this.auth0.parseHash((err, authResult) => {
    //   if (err) {
    //     this.router.navigate(['/home']);
    //     this.snackBar.open(err.errorDescription, 'close', { duration: 4000 });
    //     console.error(err);
    //   } else if (authResult && authResult.accessToken && authResult.idToken) {
    //     window.location.hash = '';
    //     this.router.navigate(['/home']);
    //     this.setSession(authResult);
    //   } else {
    //     this.isAuthenticated
    //       ? this.store.dispatch(new UserIsLoggedInAction({ id: this.userProfileId }))
    //       : this.store.dispatch(new UserIsNotLoggedInAction());
    //   }
    // });
  }

  public setSession(authResult): void {
    console.log('authResult', authResult);
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 10000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // get more user details
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        this.snackBar.open('Cannot get user profile', 'close', { duration: 3000 });
      } else if (profile) {
        this.snackBar.open(`Hello, ${profile.given_name}! You are loggen in`, 'close', { duration: 2000 });

        const { name, sub, picture } = profile;


        // add/update user in the database
        this.userService.addOrUpdateUser({ name, sub, picture }).subscribe(
          user => {
            localStorage.setItem('userId', user._id);
          },
          () => this.snackBar.open('Cannot post new login data', 'close', { duration: 3000 }),
        );
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
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

  public get userProfileName(): string | null {
    return localStorage.getItem('userName');
  }

  public get userProfilePicture(): string | null {
    return localStorage.getItem('userPicture');
  }
}

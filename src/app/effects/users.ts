import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import * as users from '../actions/users';
import { UserService } from '../services/user-service/user.service';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class UsersEffects {
  @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap(() => this.userService.getAllUsers()
      // If successful, dispatch success action with result
      .map(payload => new users.LoadUsersSuccessAction(payload))
      // If request fails, dispatch failed action
      .catch(error => {
        this.snackBar.open('Cannot receive users', 'close', { duration: 3000 });
        return Observable.of(new users.LoadUsersFailAction(error))
      }),
  );

  @Effect() checkUserLogin$ = this.actions$
    .ofType(users.CHECK_USER_LOGIN)
    .switchMap(() => this.auth.handleAuthentication()
      .map(authResult => {
        console.log(authResult);
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.store.dispatch(go(['/home']));
          this.auth.setSession(authResult);
        } else {
          return this.auth.isAuthenticated
            ? new users.UserIsLoggedInAction({ id: this.auth.userProfileId })
            : new users.UserIsNotLoggedInAction();
        }
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch(go(['/home']));
        this.snackBar.open(error.errorDescription, 'close', { duration: 4000 });
        console.error(error);
        return Observable.of(new users.CheckUserLoginFailAction(error))
      }),
    );


  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private snackBar: MdSnackBar,
    private userService: UserService,
    private store: Store<State>,
  ) {
  }
}

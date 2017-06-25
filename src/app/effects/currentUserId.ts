import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import * as users from '../actions/currentUserId';
import { UserService } from '../services/user-service/user.service';
import { AuthService } from '../services/auth-service/auth.service';
import { UserIsLoggedInAction } from "../actions/currentUserId";
import { AddOrUpdateUserAction } from "app/actions/users";

@Injectable()
export class CurrenUserIdEffects {
  @Effect() checkUserLogin$ = this.actions$
    .ofType(users.CHECK_USER_LOGIN)
    .switchMap(() => this.auth.handleAuthentication()
      .map(authResult => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          const { expiresIn, accessToken, idToken } = authResult;
          const { name, sub, picture } = authResult.idTokenPayload;
          return new users.PostUserAction({
            user: { name, sub, picture },
            session: { expiresIn, accessToken, idToken },
          });
        } else {
          return this.auth.isAuthenticated
            ? new users.UserIsLoggedInAction({ id: this.auth.userProfileId })
            : new users.UserIsNotLoggedInAction();
        }
      })
      .catch(error => {
        this.store.dispatch(go(['/home']));
        this.snackBar.open('Error during the login check', 'close', { duration: 4000 });
        console.error(error);
        return Observable.of(new users.CheckUserLoginFailAction(error));
      }),
  );

  @Effect() postUsers$ = this.actions$
    .ofType(users.POST_USER)
    .switchMap(action => this.userService.addOrUpdateUser(action.payload.user)
      .map(user => {
        this.store.dispatch(new AddOrUpdateUserAction(user));
        this.store.dispatch(new UserIsLoggedInAction({ id: user._id }));
        return new users.PostUserSuccessAction({ user, session: action.payload.session })
      })
      .catch(error => {
        this.snackBar.open('Cannot post user', 'close', { duration: 3000 });
        return Observable.of(new users.PostUserFailAction(error))
      }),
  );

  @Effect({ dispatch: false }) postUsersSuccess$ = this.actions$
    .ofType(users.POST_USER_SUCCESS)
    .do(action => {
      const userId = action.payload.user._id;
      const { expiresIn, accessToken, idToken } = action.payload.session;
      this.snackBar.open(`You are loggen in`, 'close', { duration: 2000 });
      this.auth.setSession({ expiresIn, accessToken, idToken, userId });
    });

  @Effect({ dispatch: false }) userLogout$ = this.actions$
    .ofType(users.USER_LOGOUT)
    .do(() => {
      this.snackBar.open(`You are loggen out`, 'close', { duration: 2000 });
      this.auth.logout();
    });


  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private snackBar: MdSnackBar,
    private userService: UserService,
    private store: Store<State>,
  ) {
  }
}

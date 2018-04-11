import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as users from '../actions/auth';
import { AuthActions, PostUserAction, PostUserSuccessAction, UserIsLoggedInAction } from '../actions/auth';
import { AuthService } from '../services/auth.service';
import { UpsertUser } from '../../topics/actions/users';
import { IState } from '../../topics/reducers/topics';
import { IUserService, USER_SERVICE } from '../../topics/services/users-service/types';

@Injectable()
export class AuthEffects {
  @Effect()
  checkUserLogin$ = this.actions$.pipe(
    ofType(AuthActions.CheckUserLogin),
    switchMap(() => this.auth.handleAuthentication().pipe(
      map(authResult => {
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
      }),
      catchError(error => {
        this.router.navigate(['/home']);
        this.snackBar.open('Error during the login check', 'close', { duration: 4000 });
        console.error(error);
        return of(new users.CheckUserLoginFailAction(error));
      }),
      )
    )
  );

  @Effect()
  postUsers$ = this.actions$.pipe(
    ofType(AuthActions.PostUser),
    switchMap((action: PostUserAction) => this.userService.setUser(action.payload.user).pipe(
      map(user => {
        this.store.dispatch(new UpsertUser(user));
        this.store.dispatch(new UserIsLoggedInAction({ id: user._id }));
        return new users.PostUserSuccessAction({ user, session: action.payload.session });
      }),
      catchError(error => {
        this.snackBar.open('Cannot post user', 'close', { duration: 3000 });
        return of(new users.PostUserFailAction(error));
      }),
      )
    ),
  );

  @Effect({ dispatch: false })
  postUsersSuccess$ = this.actions$.pipe(
    ofType(AuthActions.PostUserSuccess),
    tap((action: PostUserSuccessAction) => {
      const userId = action.payload.user._id;
      const { expiresIn, accessToken, idToken } = action.payload.session;
      this.snackBar.open(`You are logged in`, 'close', { duration: 2000 });
      this.auth.setSession({ expiresIn, accessToken, idToken, userId });
    }),
  );


  @Effect({ dispatch: false })
  userLogout$ = this.actions$.pipe(
    ofType(AuthActions.UserLogout),
    tap(() => {
      this.snackBar.open(`You are logged out`, 'close', { duration: 2000 });
      this.auth.logout();
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly store: Store<IState>,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {
  }
}

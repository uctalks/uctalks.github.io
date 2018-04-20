import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import * as auth from '../actions/auth';
import { AuthActions } from '../actions/auth';
import { AuthService } from '../services/auth.service';
import { IState } from '../../topics/reducers/topics';
import { IUserService, USER_SERVICE } from '../../topics/services/users-service/types';

@Injectable()
export class AuthEffects {
  @Effect()
  public readonly checkUserLogin$ = this.actions$.pipe(
    ofType(AuthActions.CheckLogin),
    exhaustMap(() => this.authService.handleAuthentication().pipe(
      map(id => id
        ? new auth.LoginSuccess(id)
        : new auth.LoginRedirect()
      ),
      catchError(error => {
        this.snackBar.open('Failed to login', 'close', { duration: 4000 });
        console.error(error);
        return of(new auth.LoginRedirect());
      }),
      )
    )
  );

  @Effect({ dispatch: false })
  public readonly loginRedirect$ = this.actions$.pipe(
    ofType(AuthActions.LoginRedirect, AuthActions.Logout),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect({ dispatch: false })
  public readonly loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.LoginSuccess),
    tap(() => this.router.navigate(['/topics']))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.Logout),
    tap(() => {
      this.router.navigate(['/login']);
      this.snackBar.open(`You are logged out`, 'close', { duration: 2000 });
      this.authService.logout();
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly store: Store<IState>,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {
  }
}

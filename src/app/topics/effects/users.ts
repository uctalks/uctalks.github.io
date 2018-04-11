import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as users from '../actions/users';
import { UsersActionTypes } from '../actions/users';
import { IUserService, USER_SERVICE } from '../services/users-service/types/index';

@Injectable()
export class UsersEffects {
  @Effect()
  public readonly loadUsers$ = this.actions$.pipe(
    ofType(UsersActionTypes.LoadUsers),
    switchMap(() => this.userService.getAllUsers().pipe(
      map(payload => new users.LoadUsersSuccess(payload)),
      catchError(error => {
        this.snackBar.open('Cannot receive users', 'close', { duration: 3000 });
        return of(new users.LoadUsersFail(error));
      }),
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {
  }
}

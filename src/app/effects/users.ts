import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';
import * as users from '../actions/users';
import {UserService} from '../services/user-service/user.service';

@Injectable()
export class UsersEffects {
  @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .switchMap(() => this.userService.getAllUsers()
      // If successful, dispatch success action with result
        .map(payload => new users.LoadUsersSuccessAction(payload))
        // If request fails, dispatch failed action
        .catch(error => {
          this.snackBar.open('Cannot receive users', 'close', {duration: 3000});
          return Observable.of(new users.LoadUsersFailAction(error))
        }),
    );


  constructor(
    private actions$: Actions,
    private snackBar: MdSnackBar,
    private userService: UserService,
  ) {
  }
}

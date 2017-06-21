import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {MdDialog} from '@angular/material';
import * as users from '../actions/users';
import {TopicAddOrEditPopupComponent} from '../components/topic-add-or-edit-popup/topic-add-or-edit-popup.component';

@Injectable()
export class UsersEffects {
  @Effect() loadUsers$ = this.actions$
    .ofType(users.LOAD_USERS)
    .do(action => this.dialog.open(TopicAddOrEditPopupComponent, { data: { users: action.payload } }))
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
    private dialog: MdDialog,
  ) {
  }
}

// const dialog = this.dialog.open(TopicAddOrEditPopupComponent, { data: { users: this.users } });
//
// dialog.afterClosed().subscribe(newTopicProps => newTopicProps && this.addTopic(newTopicProps));

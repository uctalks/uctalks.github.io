import { Action } from '@ngrx/store';
import { IUser } from '../models';

export const enum UsersActionTypes {
  LoadUsers = '[Users] Load',
  LoadUsersSuccess = '[Users] Load Success',
  LoadUsersFail = '[Users] Load Fail',
}

/**
 * Load Users Actions
 */
export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadUsersSuccess;

  constructor(public payload: Array<IUser>) {
  }
}

export class LoadUsersFail implements Action {
  readonly type = UsersActionTypes.LoadUsersFail;

  constructor(public payload: any) {
  }
}


export type UserActions
  = LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail;

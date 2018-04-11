import { Action } from '@ngrx/store';
import { IUser } from '../models/user';

export const enum UsersActionTypes {
  LoadUsers = '[Users] Load',
  LoadUsersSuccess = '[Users] Load Success',
  LoadUsersFail = '[Users] Load Fail',
  UpsertUser = '[Users] Upsert User',
}

/**
 * Load Users Actions
 */
export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UsersActionTypes.LoadUsersSuccess;

  constructor(public payload: IUser[]) {
  }
}

export class LoadUsersFail implements Action {
  readonly type = UsersActionTypes.LoadUsersFail;

  constructor(public payload: any) {
  }
}

export class UpsertUser implements Action {
  readonly type = UsersActionTypes.UpsertUser;

  constructor(public payload: IUser) {
  }
}


export type UserActions
  = LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | UpsertUser;

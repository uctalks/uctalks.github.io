import { Action } from '@ngrx/store';
import User from '../models/user';

export const LOAD_USERS = '[Users] Load';
export const LOAD_USERS_SUCCESS = '[Users] Load Success';
export const LOAD_USERS_FAIL = '[Users] Load Fail';
export const ADD_OR_UPDATE_USER = '[Users] Add Or Update User';


/**
 * Load Users Actions
 */
export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadUsersFailAction implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public payload: any) {
  }
}

export class AddOrUpdateUserAction implements Action {
  readonly type = ADD_OR_UPDATE_USER;

  constructor(public payload: User) {
  }
}


export type Actions
  = LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailAction

  | AddOrUpdateUserAction;

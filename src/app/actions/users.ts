import { Action } from '@ngrx/store';
import User from '../models/user';

export const LOAD_USERS = '[Users] Load';
export const LOAD_USERS_SUCCESS = '[Users] Load Success';
export const LOAD_USERS_FAIL = '[Users] Load Fail';

export const POST_USER = '[Users] Post';
export const POST_USER_SUCCESS = '[Users] Post Success';
export const POST_USER_FAIL = '[Users] Post Fail';


export class LoadUsersAction implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersSuccessAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
    console.log(payload);
  }
}

export class LoadUsersFailAction implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public payload: any) {
  }
}


export class PostUserAction implements Action {
  readonly type = POST_USER;

  constructor(public payload: User) {
  }
}

export class PostUserSuccessAction implements Action {
  readonly type = POST_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class PostUserFailAction implements Action {
  readonly type = POST_USER_FAIL;

  constructor(public payload: any) {
  }
}


export type Actions
  = LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailAction

  | PostUserAction
  | PostUserSuccessAction
  | PostUserFailAction;

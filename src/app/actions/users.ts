import { Action } from '@ngrx/store';
import User from '../models/user';

export const CHECK_USER_LOGIN = '[Users] Check User Login';
export const CHECK_USER_LOGIN_FAIL = '[Users] Check User Login Fail';

export const USER_IS_LOGGED_IN = '[Users] User Logged In';
export const USER_IS_NOT_LOGGED_IN = '[Users] User Is Not Logged In';

export const USER_LOGOUT = '[Users] Logout';

export const LOAD_USERS = '[Users] Load';
export const LOAD_USERS_SUCCESS = '[Users] Load Success';
export const LOAD_USERS_FAIL = '[Users] Load Fail';

export const POST_USER = '[Users] Post';
export const POST_USER_SUCCESS = '[Users] Post Success';
export const POST_USER_FAIL = '[Users] Post Fail';


/**
 * Check User Login Actions
 */
export class CheckUserLoginAction implements Action {
  readonly type = CHECK_USER_LOGIN;
}

export class CheckUserLoginFailAction implements Action {
  readonly type = CHECK_USER_LOGIN_FAIL;

  constructor(public payload: any) {
  }
}

export class UserIsLoggedInAction implements Action {
  readonly type = USER_IS_LOGGED_IN;

  constructor(public payload: { id: string }) {
  }
}

export class UserIsNotLoggedInAction implements Action {
  readonly type = USER_IS_NOT_LOGGED_IN;
}


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


/**
 * Post User Actions
 */
export class PostUserAction implements Action {
  readonly type = POST_USER;

  constructor(public payload: {
    user: { name: string, sub: string, picture: string },
    session: { expiresIn: string, accessToken: string, idToken: string },
   }) {
  }
}

export class PostUserSuccessAction implements Action {
  readonly type = POST_USER_SUCCESS;

  constructor(public payload: { user: User, session: { expiresIn: string, accessToken: string, idToken: string } }) {
  }
}

export class PostUserFailAction implements Action {
  readonly type = POST_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = USER_LOGOUT;
}

export type Actions
  = LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUsersFailAction

  | LogoutAction

  | CheckUserLoginAction
  | CheckUserLoginFailAction

  | PostUserAction
  | PostUserSuccessAction
  | PostUserFailAction

  | UserIsLoggedInAction
  | UserIsNotLoggedInAction;

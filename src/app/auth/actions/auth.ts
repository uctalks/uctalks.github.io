import { Action } from '@ngrx/store';

import { IUser } from '../../topics/models/user';

export const enum AuthActions {
  CheckUserLogin = '[Users] Check User Login',
  CheckUserLoginFail = '[Users] Check User Login Fail',
  UserIsLoggedIn = '[Users] User Logged In',
  UserIsNotLoggedIn = '[Users] User Is Not Logged In',
  UserLogout = '[Users] Logout',
  PostUser = '[Users] Post',
  PostUserSuccess = '[Users] Post Success',
  PostUserFail = '[Users] Post Fail',
}

/**
 * Check User Login Actions
 */
export class CheckUserLoginAction implements Action {
  readonly type = AuthActions.CheckUserLogin;
}

export class CheckUserLoginFailAction implements Action {
  readonly type = AuthActions.CheckUserLoginFail;

  constructor(public payload: any) {
  }
}

export class UserIsLoggedInAction implements Action {
  readonly type = AuthActions.UserIsLoggedIn;

  constructor(public payload: { id: string }) {
  }
}

export class UserIsNotLoggedInAction implements Action {
  readonly type = AuthActions.UserIsNotLoggedIn;
}


/**
 * Post User Actions
 */
export class PostUserAction implements Action {
  readonly type = AuthActions.PostUser;

  constructor(public payload: {
    user: IUser,
    session: { expiresIn: number, accessToken: string, idToken: string },
   }) {
  }
}

export class PostUserSuccessAction implements Action {
  readonly type = AuthActions.PostUserSuccess;

  constructor(public payload: { user: IUser, session: { expiresIn: number, accessToken: string, idToken: string } }) {
  }
}

export class PostUserFailAction implements Action {
  readonly type = AuthActions.PostUserFail;

  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = AuthActions.UserLogout;
}

export type Actions
  = LogoutAction

  | CheckUserLoginAction
  | CheckUserLoginFailAction

  | PostUserAction
  | PostUserSuccessAction
  | PostUserFailAction

  | UserIsLoggedInAction
  | UserIsNotLoggedInAction;

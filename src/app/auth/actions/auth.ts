import { Action } from '@ngrx/store';

export const enum AuthActions {
  CheckLogin = '[Auth] Check User Login',
  LoginRedirect = '[Auth] LoginRedirect',
  LoginSuccess = '[Auth] LoginSuccess',
  Logout = '[Auth] Logout',
}

export class CheckLogin implements Action {
  readonly type = AuthActions.CheckLogin;
}

export class LoginRedirect implements Action {
  readonly type = AuthActions.LoginRedirect;
}

export class LoginSuccess implements Action {
  readonly type = AuthActions.LoginSuccess;

  constructor(public readonly id: string) {}
}

export class Logout implements Action {
  readonly type = AuthActions.Logout;
}

export type Actions
  = CheckLogin
  | Logout
  | LoginRedirect
  | LoginSuccess;

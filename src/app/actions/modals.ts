import { Action } from '@ngrx/store';

export const OPEN_ADD_OR_EDIT_TOPIC_MODAL = '[Modal] Open Add-Or-Edit Topic';
export const CLOSE_ADD_OR_EDIT_TOPIC_MODAL = '[Modal] Close Add-Or-Edit Topic';

export const OPEN_DELETE_TOPIC_MODAL = '[Modal] Open Delete Topic';
export const CLOSE_DELETE_TOPIC_MODAL = '[Modal] Close Delete Topic';


export class OpenAddOrEditTopicModalAction implements Action {
  readonly type = LOAD_USERS;
}

export class CloseAddOrEditTopicModalAction implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
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

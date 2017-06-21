import { Action } from '@ngrx/store';

export const OPEN_ADD_TOPIC_MODAL = '[Modal] Open Add Topic';
export const CLOSE_ADD_TOPIC_MODAL = '[Modal] Close Add Topic';

export const OPEN_EDIT_TOPIC_MODAL = '[Modal] Open Edit Topic';
export const CLOSE_EDIT_TOPIC_MODAL = '[Modal] Close Edit Topic';

export const OPEN_DELETE_TOPIC_MODAL = '[Modal] Open Delete Topic';
export const CLOSE_DELETE_TOPIC_MODAL = '[Modal] Close Delete Topic';


export class OpenAddTopicModalAction implements Action {
  readonly type = OPEN_ADD_TOPIC_MODAL;

  constructor(public payload: User[]) {
  }
}

export class CloseAddTopicModalAction implements Action {
  readonly type = CLOSE_ADD_TOPIC_MODAL;

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

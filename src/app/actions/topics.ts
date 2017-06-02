import { Action } from '@ngrx/store';
import Topic from '../models/topic';
import NewTopicProps from '../components/topics/new-topic-props.interface';
import UpdatedTopicProps from '../components/topics/edited-topic-props.interface';

export const ADD_TOPIC = '[Topics] Add Topic';
export const ADD_TOPIC_SUCCESS = '[Topics] Add Topic Success';
export const ADD_TOPIC_FAIL = '[Topics] Add Topic Fail';

export const LOAD_TOPICS = '[Topics] Load';
export const LOAD_TOPICS_SUCCESS = '[Topics] Load Success';
export const LOAD_TOPICS_FAIL = '[Topics] Load Fail';

export const UPDATE_TOPIC = '[Topics] Update Topic Complete';
export const UPDATE_TOPIC_SUCCESS = '[Topics] Remove Topic Success';
export const UPDATE_TOPIC_FAIL = '[Topics] Remove Topic Fail';

export const LIKE_TOPIC = '[Topics] Like';
export const LIKE_TOPIC_SUCCESS = '[Topics] Like Success';
export const LIKE_TOPIC_FAIL = '[Topics] Like Fail';

export const REMOVE_TOPIC = '[Topics] Remove Topic';
export const REMOVE_TOPIC_SUCCESS = '[Topics] Remove Topic Success';
export const REMOVE_TOPIC_FAIL = '[Topics] Remove Topic Fail';


/**
 * Add Topic Actions
 */
export class AddTopicAction implements Action {
  readonly type = ADD_TOPIC;

  constructor(public payload: NewTopicProps) {
  }
}

export class AddTopicSuccessAction implements Action {
  readonly type = ADD_TOPIC_SUCCESS;

  constructor(public payload: Topic) {
  }
}

export class AddTopicFailAction implements Action {
  readonly type = ADD_TOPIC_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Load Topics Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD_TOPICS;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_TOPICS_SUCCESS;

  constructor(public payload: Topic[]) {
  }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_TOPICS_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Update Topic Actions
 */
export class UpdateAction implements Action {
  readonly type = UPDATE_TOPIC;

  constructor(public payload: UpdatedTopicProps) {
  }
}

export class UpdateSuccessAction implements Action {
  readonly type = UPDATE_TOPIC_SUCCESS;

  constructor(public payload: Topic) {
  }
}

export class UpdateFailAction implements Action {
  readonly type = UPDATE_TOPIC_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Like Topic Actions
 */
export class LikeAction implements Action {
  readonly type = LIKE_TOPIC;
}

export class LikeSuccessAction implements Action {
  readonly type = LIKE_TOPIC_SUCCESS;

  constructor(public payload: Topic) {
  }
}

export class LikeFailAction implements Action {
  readonly type = LIKE_TOPIC_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Remove Book from Collection Actions
 */
export class RemoveTopicAction implements Action {
  readonly type = REMOVE_TOPIC;

  constructor(public payload: Topic) {
  }
}

export class RemoveTopicSuccessAction implements Action {
  readonly type = REMOVE_TOPIC_SUCCESS;

  constructor(public payload: Topic) {
  }
}

export class RemoveTopicFailAction implements Action {
  readonly type = REMOVE_TOPIC_FAIL;

  constructor(public payload: Topic) {
  }
}


export type Actions
  = AddTopicAction
  | AddTopicSuccessAction
  | AddTopicFailAction

  | LoadAction
  | LoadSuccessAction
  | LoadFailAction

  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction

  | LikeAction
  | LikeSuccessAction
  | LikeFailAction

  | RemoveTopicAction
  | RemoveTopicSuccessAction
  | RemoveTopicFailAction;

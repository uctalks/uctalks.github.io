import { Action } from '@ngrx/store';
import NewTopicProps from '../components/topics/new-topic-props.interface';
import TopicProps from '../components/topics/topic-props.interface';
import Topic from '../models/topic';
import { TopicsSortBy, TopicsSortTypes } from '../topics/types';

export const ADD_TOPIC = '[Topics] Add Topic';
export const ADD_TOPIC_SUCCESS = '[Topics] Add Topic Success';
export const ADD_TOPIC_FAIL = '[Topics] Add Topic Fail';

export const LOAD_TOPICS = '[Topics] Load';
export const LOAD_TOPICS_SUCCESS = '[Topics] Load Success';
export const LOAD_TOPICS_FAIL = '[Topics] Load Fail';

export const UPDATE_TOPIC = '[Topics] Update Topic';
export const UPDATE_TOPIC_SUCCESS = '[Topics] Update Topic Success';
export const UPDATE_TOPIC_FAIL = '[Topics] Update Topic Fail';

export const LIKE_TOPIC = '[Topics] Like';
export const LIKE_TOPIC_SUCCESS = '[Topics] Like Success';
export const LIKE_TOPIC_FAIL = '[Topics] Like Fail';

export const DELETE_TOPIC = '[Topics] Remove Topic';
export const DELETE_TOPIC_SUCCESS = '[Topics] Remove Topic Success';
export const DELETE_TOPIC_FAIL = '[Topics] Remove Topic Fail';

export const SORT_TOPICS = '[Topics] Sort Topics';

export const OPEN_ADD_TOPIC_MODAL = '[Topics] Open Add Topic Modal';
export const CLOSE_ADD_TOPIC_MODAL_AND_ADD = '[Topics] Close Add Topic Modal And Add';

export const OPEN_EDIT_TOPIC_MODAL = '[Topics] Open Edit Topic Modal';
export const CLOSE_EDIT_TOPIC_MODAL_AND_UPDATE = '[Topics] Close Edit Topic Modal And Update';

export const OPEN_DELETE_TOPIC_MODAL = '[Topics] Open Delete Topic Modal';
export const CLOSE_DELETE_TOPIC_MODAL_AND_DELETE = '[Topics] Close Delete Topic Modal And Delete';

export const CLOSE_ALL_MODALS = '[Topics] Close All Modals';


/**
 * Add Topic Actions
 */
export class AddTopicAction implements Action {
  readonly type = ADD_TOPIC;

  constructor(public payload: { newTopicProps: NewTopicProps }) {
  }
}

export class AddTopicSuccessAction implements Action {
  readonly type = ADD_TOPIC_SUCCESS;

  constructor(public payload: { addedTopic: Topic }) {
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
export class LoadTopicsAction implements Action {
  readonly type = LOAD_TOPICS;
}

export class LoadTopicsSuccessAction implements Action {
  readonly type = LOAD_TOPICS_SUCCESS;

  constructor(public payload: Topic[]) {
  }
}

export class LoadTopicsFailAction implements Action {
  readonly type = LOAD_TOPICS_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Update Topic Actions
 */
export class UpdateTopicAction implements Action {
  readonly type = UPDATE_TOPIC;

  constructor(public payload: { id: string, updatedTopicProps: TopicProps }) {
  }
}

export class UpdateTopicSuccessAction implements Action {
  readonly type = UPDATE_TOPIC_SUCCESS;

  constructor(public payload: { updatedTopic: Topic }) {
  }
}

export class UpdateTopicFailAction implements Action {
  readonly type = UPDATE_TOPIC_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Like Topic Actions
 */
export class LikeAction implements Action {
  readonly type = LIKE_TOPIC;

  constructor(public payload: { topicId: string, userId: string, liked: boolean }) {
  }
}

export class LikeSuccessAction implements Action {
  readonly type = LIKE_TOPIC_SUCCESS;

  constructor(public payload: { updatedTopic: Topic }) {
  }
}

export class LikeFailAction implements Action {
  readonly type = LIKE_TOPIC_FAIL;

  constructor(public payload: any) {
  }
}


/**
 * Delete Topic Actions
 */
export class DeleteTopicAction implements Action {
  readonly type = DELETE_TOPIC;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteTopicSuccessAction implements Action {
  readonly type = DELETE_TOPIC_SUCCESS;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteTopicFailAction implements Action {
  readonly type = DELETE_TOPIC_FAIL;

  constructor(public payload: { id: string }) {
  }
}


/**
 * Sort Topics Action
 */
export class SortTopicsAction implements Action {
  readonly type = SORT_TOPICS;

  constructor(public payload: { sortBy: TopicsSortBy, sortType: TopicsSortTypes }) {
  }
}


/**
 * Add Topic Modal Actions
 */
export class OpenAddTopicModalAction implements Action {
  readonly type = OPEN_ADD_TOPIC_MODAL;
}

export class CloseAddTopicModalAction implements Action {
  readonly type = CLOSE_ADD_TOPIC_MODAL_AND_ADD;

  constructor(public payload: { newTopicProps: NewTopicProps }) {
  }
}


/**
 * Edit Topic Modal Actions
 */
export class OpenEditTopicModalAction implements Action {
  readonly type = OPEN_EDIT_TOPIC_MODAL;

  constructor(public payload: { topic: Topic }) {
  }
}

export class CloseEditTopicModalAction implements Action {
  readonly type = CLOSE_EDIT_TOPIC_MODAL_AND_UPDATE;

  constructor(public payload: { updatedTopicProps: TopicProps, id: string }) {
  }
}


/**
 * Delete Topic Modal Actions
 */
export class OpenDeleteTopicModalAction implements Action {
  readonly type = OPEN_DELETE_TOPIC_MODAL;

  constructor(public payload: { id: string }) {
  }
}

export class CloseDeleteTopicModalActionAndDelete implements Action {
  readonly type = CLOSE_DELETE_TOPIC_MODAL_AND_DELETE;

  constructor(public payload: { id: string }) {
  }
}

export class CloseAllModals implements Action {
  readonly type = CLOSE_ALL_MODALS;
}


export type Actions
  = AddTopicAction
  | AddTopicSuccessAction
  | AddTopicFailAction

  | LoadTopicsAction
  | LoadTopicsSuccessAction
  | LoadTopicsFailAction

  | UpdateTopicAction
  | UpdateTopicSuccessAction
  | UpdateTopicFailAction

  | LikeAction
  | LikeSuccessAction
  | LikeFailAction

  | DeleteTopicAction
  | DeleteTopicSuccessAction
  | DeleteTopicFailAction

  | SortTopicsAction

  | OpenAddTopicModalAction
  | CloseAddTopicModalAction

  | OpenEditTopicModalAction
  | CloseEditTopicModalAction

  | OpenDeleteTopicModalAction
  | CloseDeleteTopicModalActionAndDelete

  | CloseAllModals;

import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import NewTopicProps from '../components/topics/new-topic-props.interface';
import TopicProps from '../components/topics/topic-props.interface';
import Topic from '../models/topic';
import { TopicsSortBy, TopicsSortTypes } from '../types';

export const enum TopicsActions {
  Add = '[Topics] Add Topic',
  AddSuccess = '[Topics] Add Topic Success',
  AddFail = '[Topics] Add Topic Fail',
  Load = '[Topics] Load',
  LoadSuccess = '[Topics] Load Success',
  LoadFail = '[Topics] Load Fail',
  Update = '[Topics] Update Topic',
  UpdateSuccess = '[Topics] Update Topic Success',
  UpdateFail = '[Topics] Update Topic Fail',
  Like = '[Topics] Like',
  LikeSuccess = '[Topics] Like Success',
  LikeFail = '[Topics] Like Fail',
  Delete = '[Topics] Delete Topic',
  DeleteSuccess = '[Topics] Delete Topic Success',
  DeleteFail = '[Topics] Delete Topic Fail',
  Sort = '[Topics] Sort Topics',
  OpenAddModal = '[Topics] Open Add Topic Modal',
  CloseAddModal = '[Topics] Close Add Topic Modal',
  OpenEditModal = '[Topics] Open Edit Topic Modal',
  CloseEditModal = '[Topics] Close Edit Topic Modal',
  OpenDeleteModal = '[Topics] Open Delete Topic Modal',
  CloseDeleteModal = '[Topics] Close Delete Topic Modal',
  CloseAllModals = '[Topics] Close All Modals',
}

/**
 * Add Topic Actions
 */
export class AddTopicAction implements Action {
  readonly type = TopicsActions.Add;

  constructor(public payload: { newTopicProps: NewTopicProps }) {
  }
}

export class AddTopicSuccessAction implements Action {
  readonly type = TopicsActions.AddSuccess;

  constructor(public payload: { addedTopic: Topic }) {
  }
}

export class AddTopicFailAction implements Action {
  readonly type = TopicsActions.AddFail;

  constructor(public payload: any) {
  }
}


/**
 * Load Topics Actions
 */
export class LoadTopicsAction implements Action {
  readonly type = TopicsActions.Load;
}

export class LoadTopicsSuccessAction implements Action {
  readonly type = TopicsActions.LoadSuccess;

  constructor(public payload: Topic[]) {
  }
}

export class LoadTopicsFailAction implements Action {
  readonly type = TopicsActions.LoadFail;

  constructor(public payload: any) {
  }
}


/**
 * Update Topic Actions
 */
export class UpdateTopicAction implements Action {
  readonly type = TopicsActions.Update;

  constructor(public payload: { id: string, updatedTopicProps: TopicProps }) {
  }
}

export class UpdateTopicSuccessAction implements Action {
  readonly type = TopicsActions.UpdateSuccess;

  constructor(public payload: Update<Topic>) {
  }
}

export class UpdateTopicFailAction implements Action {
  readonly type = TopicsActions.UpdateFail;

  constructor(public payload: any) {
  }
}


/**
 * Like Topic Actions
 */
export class LikeAction implements Action {
  readonly type = TopicsActions.Like;

  constructor(public payload: { topicId: string, userId: string, liked: boolean }) {
  }
}

export class LikeSuccessAction implements Action {
  readonly type = TopicsActions.LikeSuccess;

  constructor(public payload: Update<Topic>) {
  }
}

export class LikeFailAction implements Action {
  readonly type = TopicsActions.LikeFail;

  constructor(public payload: any) {
  }
}


/**
 * Delete Topic Actions
 */
export class DeleteTopicAction implements Action {
  readonly type = TopicsActions.Delete;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteTopicSuccessAction implements Action {
  readonly type = TopicsActions.DeleteSuccess;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteTopicFailAction implements Action {
  readonly type = TopicsActions.DeleteFail;

  constructor(public payload: { id: string }) {
  }
}


/**
 * Sort Topics Action
 */
export class SortTopicsAction implements Action {
  readonly type = TopicsActions.Sort;

  constructor(public payload: { sortBy: TopicsSortBy, sortType: TopicsSortTypes }) {
  }
}


/**
 * Add Topic Modal Actions
 */
export class OpenAddTopicModalAction implements Action {
  readonly type = TopicsActions.OpenAddModal;
}

export class CloseAddTopicModalAction implements Action {
  readonly type = TopicsActions.CloseAddModal;

  constructor(public payload: { newTopicProps: NewTopicProps }) {
  }
}


/**
 * Edit Topic Modal Actions
 */
export class OpenEditTopicModalAction implements Action {
  readonly type = TopicsActions.OpenEditModal;

  constructor(public payload: { topic: Topic }) {
  }
}

export class CloseEditTopicModalAction implements Action {
  readonly type = TopicsActions.CloseEditModal;

  constructor(public payload: { updatedTopicProps: TopicProps, id: string }) {
  }
}


/**
 * Delete Topic Modal Actions
 */
export class OpenDeleteTopicModalAction implements Action {
  readonly type = TopicsActions.OpenDeleteModal;

  constructor(public payload: { id: string }) {
  }
}

export class CloseDeleteTopicModalActionAndDelete implements Action {
  readonly type = TopicsActions.CloseDeleteModal;

  constructor(public payload: { id: string }) {
  }
}

export class CloseAllModals implements Action {
  readonly type = TopicsActions.CloseAllModals;
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

import { createSelector } from 'reselect';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromTopics from './topics';
import * as fromUsers from './users';
import { ITopic } from '../models';
import { TopicsSortBy, TopicsSortTypes } from '../types';

const compareBoolsOrNumbers = (a: boolean | number, b: boolean | number) => {
  return Number(b) - Number(a);
};

const compareStrings = (a: string, b: string) => {
  if (!a && !b) {
    return 0;
  } else if (!a && b) {
    return 1;
  } else if (a && !b) {
    return -1;
  }

  a = a.toLowerCase();
  b = b.toLowerCase();
  return b > a ? 1 : b === a ? 0 : -1;
};

const sortTopics = (topics: ITopic[], { sortBy, sortType }: { sortBy: TopicsSortBy, sortType: TopicsSortTypes }): ITopic[] => {
  switch (sortType) {
    case TopicsSortTypes.Descending:
      switch (sortBy) {
        case TopicsSortBy.Name:
        case TopicsSortBy.PresentationDate:
        case TopicsSortBy.SpeakerId:
          return topics.sort((a: ITopic, b: ITopic) => compareStrings(a[sortBy], b[sortBy]));

        case TopicsSortBy.Likes:
        case TopicsSortBy.Presented:
          return topics.sort((a: ITopic, b: ITopic) => compareBoolsOrNumbers(a[sortBy], b[sortBy]));

        default:
          return topics;
      }

    case TopicsSortTypes.Ascending:
      switch (sortBy) {
        case TopicsSortBy.Name:
        case TopicsSortBy.PresentationDate:
        case TopicsSortBy.SpeakerId:
          return topics.sort((a: ITopic, b: ITopic) => compareStrings(b[sortBy], a[sortBy]));

        case TopicsSortBy.Likes:
        case TopicsSortBy.Presented:
          return topics.sort((a: ITopic, b: ITopic) => compareBoolsOrNumbers(b[sortBy], a[sortBy]));

        default:
          return topics;
      }

    default:
      return topics;
  }
};

export interface ITopicsState {
  readonly topics: fromTopics.IState;
  readonly users: fromUsers.IState;
}

export interface IState extends fromRoot.IState {
  readonly topics: ITopicsState;
}

export const reducers: ActionReducerMap<ITopicsState> = {
  topics: fromTopics.reducer,
  users: fromUsers.reducer,
};

export const getTopicsState = createFeatureSelector<ITopicsState>('topics');

export const getTopicsEntitiesState = createSelector(
  getTopicsState,
  state => state.topics
);

export const getUserEntitiesState = createSelector(
  getTopicsState,
  state => state.users
);

// TODO check how we can sort topics in adapter
const { selectAll: getUnsortedTopics } = fromTopics.adapter.getSelectors(getTopicsEntitiesState);

export const getTopicsLoading = createSelector(getTopicsEntitiesState, fromTopics.getLoading);

export const getUsersLoading = createSelector(getUserEntitiesState, fromUsers.getLoading);

export const getTopicsSort = createSelector(getTopicsEntitiesState, fromTopics.getSort);

export const getTopics = createSelector(
  getUnsortedTopics,
  getTopicsSort,
  (unsortedTopics, sort) => sortTopics(unsortedTopics, sort),
);

export const { selectAll: getUsers } = fromUsers.adapter.getSelectors(getUserEntitiesState);

export const getSpinnerIsVisible = createSelector(
  getTopicsLoading,
  getUsersLoading,
  (topicsLoading, usersLoading) => topicsLoading && usersLoading,
);

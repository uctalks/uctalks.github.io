import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromTopics from './topics';
import * as fromUsers from './users';
import * as fromCurrentUserId from './currentUserId';
import { ITopic } from '../models/topic';
import { TopicsSortBy, TopicsSortTypes } from '../topics/types';

export interface State {
  router: fromRouter.RouterReducerState;
  topics: fromTopics.State;
  users: fromUsers.State;
  currentUserId: fromCurrentUserId.State;
}



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
        case 'name':
        case 'presentationDate':
        case 'speakerId':
          return topics.sort((a: ITopic, b: ITopic) => compareStrings(a[sortBy], b[sortBy]));

        case 'likes':
        case 'presented':
          return topics.sort((a: ITopic, b: ITopic) => compareBoolsOrNumbers(a[sortBy], b[sortBy]));

        default:
          return topics;
      }

    case TopicsSortTypes.Ascending:
      switch (sortBy) {
        case 'name':
        case 'presentationDate':
        case 'speakerId':
          return topics.sort((a: ITopic, b: ITopic) => compareStrings(b[sortBy], a[sortBy]));

        case 'likes':
        case 'presented':
          return topics.sort((a: ITopic, b: ITopic) => compareBoolsOrNumbers(b[sortBy], a[sortBy]));

        default:
          return topics;
      }

    default:
      return topics;
  }
};

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  topics: fromTopics.reducer,
  users: fromUsers.reducer,
  currentUserId: fromCurrentUserId.reducer,
};

// currentUserId selectors
export const getCurrentUserIdState = (state: State) => state.currentUserId;
export const getCurrentUserId = createSelector(getCurrentUserIdState, fromCurrentUserId.getCurrentUserId);

// topics selectors
export const getTopicsState = (state: State) => state.topics;
export const getTopicsEntities = createSelector(getTopicsState, fromTopics.getEntities);
export const getTopicsIds = createSelector(getTopicsState, fromTopics.getIds);
export const getTopicsIsFetching = createSelector(getTopicsState, fromTopics.getIsFetching);
export const getTopicsSort = createSelector(getTopicsState, fromTopics.getSort);
export const getTopics = createSelector(
  getTopicsEntities,
  getTopicsIds,
  getCurrentUserId,
  getTopicsSort,
  (entities, ids, currentUserId, sort) => sortTopics(
    ids.map(id => (
      { ...(entities[id]), likedByUser: entities[id].usersLikedIds.includes(currentUserId) }
    )),
    sort,
  ));

// users selectors
export const getUsersState = (state: State) => state.users;
export const getUserEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUserIds = createSelector(getUsersState, fromUsers.getIds);
export const getUserIsFetching = createSelector(getUsersState, fromUsers.getIsFetching);
export const getUsers = createSelector(getUserEntities, getUserIds, (entities, ids) => ids.map(id => entities[id]));

// spinnerIsVisible selector
export const getSpinnerIsVisible = createSelector(
  getTopicsIsFetching,
  getUserIsFetching,
  (topicsIsFetching, usersIsFetching) => topicsIsFetching || usersIsFetching,
);

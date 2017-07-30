import {createSelector} from 'reselect';
import {ActionReducerMap} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromTopics from './topics';
import * as fromUsers from './users';
import * as fromCurrentUserId from './currentUserId';
import {TopicsService} from '../services/topics-service/topics.service';

export interface State {
  router: fromRouter.RouterReducerState;
  topics: fromTopics.State;
  users: fromUsers.State;
  currentUserId: fromCurrentUserId.State;
}

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
  (entities, ids, currentUserId, sort) => TopicsService.sortTopics(
    ids.map(id => (
      {...(entities[id]), likedByUser: entities[id].usersLikedIds.includes(currentUserId) }
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

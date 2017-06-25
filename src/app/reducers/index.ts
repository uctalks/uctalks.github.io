import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromTopics from './topics';
import * as fromUsers from './users';
import * as fromCurrentUserId from './currentUserId';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

export interface State {
  router: fromRouter.RouterState;
  topics: fromTopics.State;
  users: fromUsers.State;
  currentUserId: fromCurrentUserId.State;
}

const reducers = {
  router: fromRouter.routerReducer,
  topics: fromTopics.reducer,
  users: fromUsers.reducer,
  currentUserId: fromCurrentUserId.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getTopicsState = (state: State) => state.topics;
export const getTopicsEntities = createSelector(getTopicsState, fromTopics.getEntities);
export const getTopicsIds = createSelector(getTopicsState, fromTopics.getIds);
export const getTopicsIsFetching = createSelector(getTopicsState, fromTopics.getIsFetching);
export const getTopics = createSelector(getTopicsEntities, getTopicsIds, (entities, ids) => ids.map(id => entities[id]));

export const getUsersState = (state: State) => state.users;
export const getUserEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUserIds = createSelector(getUsersState, fromUsers.getIds);
export const getUserIsFetching = createSelector(getUsersState, fromUsers.getIsFetching);
export const getUsers = createSelector(getUserEntities, getUserIds, (entities, ids) => ids.map(id => entities[id]));

export const getCurrentUserIdState = (state: State) => state.currentUserId;
export const getCurrentUserId = createSelector(getCurrentUserIdState, fromCurrentUserId.getCurrentUserId);

export const getSpinnerIsVisible = createSelector(
  getTopicsIsFetching,
  getUserIsFetching,
  (topicsIsFetching, usersIsFetching) => topicsIsFetching || usersIsFetching,
);

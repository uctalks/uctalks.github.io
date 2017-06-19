import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromTopics from './topics';
import * as fromUsers from './users';

export interface State {
  router: fromRouter.RouterState;
  topics: fromTopics.State;
  users: fromUsers.State;
}

const reducers = {
  router: fromRouter.routerReducer,
  topics: fromTopics.reducer,
  users: fromUsers.reducer,
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
export const getTopicsEntities = createSelector(getTopicsState, fromTopics.getTopics);
export const getTopicsIds = createSelector(getTopicsState, fromTopics.getIds);


export const getUsersState = (state: State) => state.users;
export const getUserEntities = createSelector(getUsersState, fromUsers.getEntities);
export const getUserIds = createSelector(getUsersState, fromUsers.getIds);

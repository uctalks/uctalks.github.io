import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromTopics from './topics';

export interface State {
  topics: fromTopics.State;
  router: fromRouter.RouterState;
}

const reducers = {
  books: fromTopics.reducer,
  router: fromRouter.routerReducer,
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

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCurrentUser from './current-user';

export interface IState {
  currentUser: fromCurrentUser.IState;
}

export const reducers: ActionReducerMap<IState> = {
  currentUser: fromCurrentUser.reducer,
};

export const getAuthState = createFeatureSelector<IState>('auth');

export const getCurrentUserState = createSelector(
  getAuthState,
  state => state.currentUser,
);

export const getCurrentUserId = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserId
);

export const getLoggedIn = createSelector(
  getCurrentUserState,
  fromCurrentUser.getLoggedIn
);

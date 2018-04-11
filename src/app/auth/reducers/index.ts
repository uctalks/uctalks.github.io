import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCurrentUser from './current-user';

export interface IAuthState {
  currentUser: fromCurrentUser.IState;
}

export const reducers: ActionReducerMap<IAuthState> = {
  currentUser: fromCurrentUser.reducer,
};

export const getAuthState = createFeatureSelector<IAuthState>('auth');

export const getCurrentUserState = createSelector(
  getAuthState,
  state => state.currentUser,
);

export const getCurrentUserId = createSelector(
  getCurrentUserState,
  fromCurrentUser.getCurrentUserId
);

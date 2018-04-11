import { ActionReducerMap, MetaReducer, } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../utils';

// import * as fromLayout from '../core/reducers/layout'; // TODO implement

export interface IState {
  // layout: fromLayout.IState; // TODO implement
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<IState> = {
  // layout: fromLayout.reducer, // TODO implement
  router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [storeFreeze] : [];

// export const getLayoutState = createFeatureSelector<fromLayout.IState>('layout');
//
// export const getShowSidenav = createSelector(
//   getLayoutState,
//   fromLayout.getShowSidenav
// );

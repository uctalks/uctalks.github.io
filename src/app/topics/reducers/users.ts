import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IUser } from '../models';
import { UserActions, UsersActionTypes } from '../actions';

export interface IState extends EntityState<IUser> {
  readonly loading: boolean;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user.user_id,
  sortComparer: false,
});

export const initialState = adapter.getInitialState({
  loading: false,
});

export function reducer(state = initialState, action: UserActions): IState {
  switch (action.type) {
    case UsersActionTypes.LoadUsers: {
      return { ...state, loading: true };
    }

    case UsersActionTypes.LoadUsersSuccess: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
      });
    }

    case UsersActionTypes.LoadUsersFail: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: IState) => state.loading;

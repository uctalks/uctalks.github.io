import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IUser } from '../models/user';
import { UserActions, UsersActionTypes } from '../actions/users';

export interface IState extends EntityState<IUser> {
  loading: boolean;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user._id,
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

    // TODO fix it:
    // case UsersActionTypes.UpsertUser: {
    //  return adapter.upsertOne(action.payload, {
    //    ...state,
    //    loading: false
    //  })
    // }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: IState) => state.loading;

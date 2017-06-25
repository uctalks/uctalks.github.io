import User from '../models/user';
import * as users from '../actions/users';

export interface State {
  entities: { [id: string]: User };
  ids: string[];
  isFetching: boolean;
}

export const initialState: State = {
  entities: {},
  ids: [],
  isFetching: false,
};

export function reducer(state = initialState, action: users.Actions): State {
  switch (action.type) {
    case users.LOAD_USERS: {
      return { ...state, isFetching: true };
    }

    case users.LOAD_USERS_SUCCESS: {
      const ids = (action as users.LoadUsersSuccessAction).payload.map(topic => topic._id);

      const entities = (action as users.LoadUsersSuccessAction).payload
        .reduce((users: { [id: string]: User }, user: User) => Object.assign(users, { [user._id]: user }), {});

      return { ...state, ids, entities, isFetching: false };
    }

    case users.LOAD_USERS_FAIL: {
      return { ...state, isFetching: false };
    }

    case users.ADD_OR_UPDATE_USER: {
      const user = action.payload;
      return { ...state, users: Object.assign(users, { [user._id]: user }) };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getIsFetching = (state: State) => state.isFetching;

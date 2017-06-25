import User from '../models/user';
import * as users from '../actions/users';

export interface State {
  currentUserId: string;
  entities: { [id: string]: User };
  ids: string[];
  isFetching: boolean;
  isLoggedIn: boolean;
}

export const initialState: State = {
  currentUserId: null,
  entities: {},
  ids: [],
  isFetching: false,
  isLoggedIn: false,
};

export function reducer(state = initialState, action: users.Actions): State {
  switch (action.type) {
    case users.LOAD_USERS: {
      return { ...state, isFetching: true };
    }

    case users.LOAD_USERS_SUCCESS: {
      const ids = action.payload.map(topic => topic._id);

      const entities = action.payload.reduce((users: { [id: string]: User }, user: User) => Object.assign(users, { [user._id]: user }), {});

      return { ...state, ids, entities, isFetching: false };
    }

    case users.LOAD_USERS_FAIL: {
      return { ...state, isFetching: false };
    }

    case users.USER_IS_LOGGED_IN:
      return { ...state, isLoggedIn: true, currentUserId: action.payload.id };

    case users.USER_LOGOUT:
      return { ...state, isLoggedIn: false, currentUserId: null };

    case users.POST_USER_SUCCESS: {
      const user = action.payload.user;
      return { ...state, isLoggedIn: true, currentUserId: user._id, users: Object.assign(users, { [user._id]: user }) };
    }

    default: {
      return state;
    }
  }
}

export const getCurrentUserId = (state: State) => state.currentUserId;

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getIsFetching = (state: State) => state.isFetching;

export const getIsLoggenIn = (state: State) => state.isLoggedIn;

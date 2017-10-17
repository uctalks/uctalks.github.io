import User from '../models/user';
import * as usersActions from '../actions/users';

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

export function reducer(state = initialState, action: usersActions.Actions): State {
  switch (action.type) {
    case usersActions.LOAD_USERS: {
      return { ...state, isFetching: true };
    }

    case usersActions.LOAD_USERS_SUCCESS: {
      const ids = (action as usersActions.LoadUsersSuccessAction).payload.map(topic => topic._id);

      const entities = (action as usersActions.LoadUsersSuccessAction).payload
        .reduce((usersEntities: { [id: string]: User }, user: User) => Object.assign(usersEntities, { [user._id]: user }), {});

      return { ...state, ids, entities, isFetching: false };
    }

    case usersActions.LOAD_USERS_FAIL: {
      return { ...state, isFetching: false };
    }

    case usersActions.ADD_OR_UPDATE_USER: {
      const user = action.payload;
      return { ...state, entities: Object.assign(state.entities, { [user._id]: user }) };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getIsFetching = (state: State) => state.isFetching;

import User from '../models/user';
import * as users from '../actions/users';

export interface State {
  ids: string[];
  entities: { [id: string]: User };
}

export const initialState: State = {
  ids: [],
  entities: {},
};

export function reducer(state = initialState, action: users.Actions | users.Actions): State {
  switch (action.type) {
    case users.LOAD_USERS_SUCCESS: {
      const users = action.payload;

      console.log(users);
      const ids = users.map(topic => topic._id);
      const entities = users.reduce(
        (receivedEntities: { [id: string]: User }, user: User) => {
          return Object.assign(receivedEntities, {
            [user._id]: user,
          });
        }, {});

      return {
        ids,
        entities,
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

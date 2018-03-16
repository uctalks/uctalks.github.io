import * as currentUserId from '../actions/currentUserId';

export type State = string;

export const initialState: State = null;

export function reducer(state = initialState, action: currentUserId.Actions): State {
  switch (action.type) {

    case currentUserId.USER_IS_LOGGED_IN:
      return action.payload.id;

    case currentUserId.USER_LOGOUT:
      return null;

    default: {
      return state;
    }
  }
}

export const getCurrentUserId = (state: State) => state;

import * as currentUserId from '../actions/auth';
import { AuthActions } from '../actions/auth';

export interface IState {
  readonly id: string;
}

export const initialState: IState = { id: null };

export function reducer(state = initialState, action: currentUserId.Actions): IState {
  switch (action.type) {

    case AuthActions.UserIsLoggedIn:
      return { id: action.payload.id };

    case AuthActions.UserLogout:
      return { id: null };

    default: {
      return state;
    }
  }
}

export const getCurrentUserId = (state: IState): string => state.id;

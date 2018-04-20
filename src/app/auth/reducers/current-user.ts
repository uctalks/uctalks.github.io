import * as currentUserId from '../actions/auth';
import { AuthActions } from '../actions/auth';

export interface IState {
  readonly id: string | null;
}

export const initialState: IState = { id: null };

export function reducer(state = initialState, action: currentUserId.Actions): IState {
  switch (action.type) {

    case AuthActions.LoginSuccess:
      return { id: action.id };

    case AuthActions.LoginRedirect:
    case AuthActions.Logout:
      return initialState;

    default: {
      return state;
    }
  }
}

export const getCurrentUserId = (state: IState): string => state.id;
export const getLoggedIn = (state: IState): boolean => !!state.id;

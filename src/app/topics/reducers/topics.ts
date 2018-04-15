import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITopic } from '../models';
import { Actions, ActionsNames } from '../actions';
import { TopicsSortBy, TopicsSortTypes } from '../types';

export interface IState extends EntityState<ITopic> {
  loading: boolean;
  sort: { sortBy: TopicsSortBy, sortType: TopicsSortTypes };
}

export const adapter: EntityAdapter<ITopic> = createEntityAdapter<ITopic>({
  selectId: (topic: ITopic) => topic._id,
  sortComparer: false,
});

export const initialState = adapter.getInitialState({
  loading: true,
  sort: { sortBy: TopicsSortBy.PresentationDate, sortType: TopicsSortTypes.Descending },
});

export function reducer(state = initialState, action: Actions): IState {
  switch (action.type) {
    case ActionsNames.Add:
    case ActionsNames.Update:
    case ActionsNames.Like:
    case ActionsNames.Load:
    case ActionsNames.Delete:
      return { ...state, loading: true };


    case ActionsNames.AddSuccess:
      return adapter.addOne(action.payload.addedTopic, { ...state, loading: false });

    case ActionsNames.UpdateSuccess:
    case ActionsNames.LikeSuccess:
      return adapter.updateOne(action.payload, { ...state, loading: false });

    case ActionsNames.LoadSuccess:
      return adapter.addAll(action.payload, { ...state, loading: false });

    case ActionsNames.DeleteSuccess:
      return adapter.removeOne(action.payload.id, { ...state, loading: false });

    case ActionsNames.Sort:
      return { ...state, sort: action.payload };

    case ActionsNames.AddFail:
    case ActionsNames.UpdateFail:
    case ActionsNames.LikeFail:
    case ActionsNames.LoadFail:
    case ActionsNames.DeleteFail:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export const getLoading = (state: IState) => state.loading;

export const getSort = (state: IState) => state.sort;

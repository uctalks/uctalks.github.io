import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITopic } from '../models/topic';
import * as topics from '../actions/topics';
import { TopicsActions } from '../actions/topics';
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

export function reducer(state = initialState, action: topics.Actions): IState {
  switch (action.type) {
    case TopicsActions.Add:
    case TopicsActions.Update:
    case TopicsActions.Like:
    case TopicsActions.Load:
    case TopicsActions.Delete:
      return { ...state, loading: true };


    case TopicsActions.AddSuccess:
      return adapter.addOne(action.payload.addedTopic, { ...state, loading: false });

    case TopicsActions.UpdateSuccess:
    case TopicsActions.LikeSuccess:
      return adapter.updateOne(action.payload, { ...state, loading: false });

    case TopicsActions.LoadSuccess:
      return adapter.addAll(action.payload, { ...state, loading: false });

    case TopicsActions.DeleteSuccess:
      return adapter.removeOne(action.payload.id, { ...state, loading: false });

    case TopicsActions.Sort:
      return { ...state, sort: action.payload };

    case TopicsActions.AddFail:
    case TopicsActions.UpdateFail:
    case TopicsActions.LikeFail:
    case TopicsActions.LoadFail:
    case TopicsActions.DeleteFail:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export const getLoading = (state: IState) => state.loading;

export const getSort = (state: IState) => state.sort;

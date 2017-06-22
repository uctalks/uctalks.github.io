import Topic from '../models/topic';
import * as topics from '../actions/topics';
import { DeleteTopicSuccessAction } from '../actions/topics';

export interface State {
  entities: { [id: string]: Topic },
  ids: string[];
  isFetching: boolean;
}

export const initialState: State = {
  ids: [],
  entities: {},
  isFetching: false,
};

export function reducer(state = initialState, action: topics.Actions): State {
  switch (action.type) {
    case topics.LOAD_TOPICS:
    case topics.DELETE_TOPIC:
      return { ...state, isFetching: true };

    case topics.LOAD_TOPICS_SUCCESS:
      const ids = action.payload.map(topic => topic._id);

      const entities = action.payload
        .reduce((topics: { [id: string]: Topic }, topic: Topic) => Object.assign(topics, { [topic._id]: topic }), {});

      return { ids, entities, isFetching: false };

    case topics.LOAD_TOPICS_FAIL:
    case topics.DELETE_TOPIC_FAIL:
      return { ...state, isFetching: false };

    case topics.DELETE_TOPIC_SUCCESS:
      return { ...state, ids: state.ids.filter(id => id !== (action as DeleteTopicSuccessAction).payload.id), isFetching: false };

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getIsFetching = (state: State) => state.isFetching;

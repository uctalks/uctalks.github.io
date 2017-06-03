import { createSelector } from 'reselect';
import Topic from '../models/topic';
import * as topics from '../actions/topics';

export interface State {
  ids: string[];
  // entities: { [id: string]: Topic };
  topics: Topic[],
}

export const initialState: State = {
  ids: [],
  // entities: {},
  topics: [],
};

export function reducer(state = initialState, action: topics.Actions | topics.Actions): State {
  switch (action.type) {
    case topics.LOAD_TOPICS_SUCCESS: {
      const topics = action.payload;

      const topicsIds = topics.map(topic => topic._id);
      // const topicsEntities = topics.reduce((entities: { [id: string]: Topic }, topic: Topic) => {
      //   return Object.assign(entities, {
      //     [topic._id]: topic,
      //   });
      // }, {});

      return {
        ids: [ ...topicsIds ],
        topics,
        // entities: Object.assign({}, topicsEntities),
      };
    }

    default: {
      return state;
    }
  }
}

export const getTopics = (state: State) => state.topics;

export const getIds = (state: State) => state.ids;

export const getAll = createSelector(getTopics, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

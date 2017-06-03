// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/toArray';
// import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
// import { Effect, Actions } from '@ngrx/effects';
// import { Database } from '@ngrx/db';
// import { Observable } from 'rxjs/Observable';
// import { defer } from 'rxjs/observable/defer';
// import { of } from 'rxjs/observable/of';
//
// import * as topics from '../actions/topics';
// import Topic from '../models/topic';
//
//
// @Injectable()
// export class TopicsEffects {
//
//   @Effect({ dispatch: false })
//   openDB$: Observable<any> = defer(() => {
//     return this.db.open('uc_talks');
//   });
//
//   /**
//    * This effect makes use of the `startWith` operator to trigger
//    * the effect immediately on startup.
//    */
//   @Effect()
//   loadTopics$: Observable<Action> = this.actions$
//     .ofType(topics.LOAD_TOPICS)
//     .startWith(new topics.LoadTopicsAction())
//     .switchMap(() =>
//       this.db.query('topics')
//         .toArray()
//         .map((topicsList: Topic[]) => new topics.LoadTopicsSuccessAction(topicsList))
//         .catch(error => of(new topics.LoadTopicsFailAction(error))));
//
//   @Effect()
//   addTopic$: Observable<Action> = this.actions$
//     .ofType(topics.ADD_TOPIC)
//     .map((action: topics.AddTopicAction) => action.payload)
//     .mergeMap(topic =>
//       this.db.insert('topics', [topic])
//         .map(() => new topics.AddTopicSuccessAction(topic))
//         .catch(() => of(new topics.AddTopicFailAction(topic))));
//
//
//   @Effect()
//   removeTopic$: Observable<Action> = this.actions$
//     .ofType(topics.REMOVE_TOPIC)
//     .map((action: topics.RemoveTopicAction) => action.payload)
//     .mergeMap(topic =>
//       this.db.executeWrite('books', 'delete', [topic._id])
//         .map(() => new topics.RemoveTopicSuccessAction(topic))
//         .catch(() => of(new topics.RemoveTopicFailAction(topic))));
//
//   constructor(private actions$: Actions, private db: Database) {
//   }
// }

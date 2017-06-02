import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as topics from '../actions/topics';
import restPrefix from '../rest-prefix';

@Injectable()
export class TopicsEffects {
  @Effect() loadTopics$ = this.actions$
  // Listen for the topics.LOAD_TOPICS action
    .ofType(topics.LOAD_TOPICS)
    .switchMap(() => this.http.get(`${restPrefix}/topics`)
      // If successful, dispatch success action with result
        .map(res => ({ type: topics.LOAD_TOPICS_SUCCESS, payload: res.json() }))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({ type: topics.LOAD_TOPICS_FAIL })),
    );


  // @Effect() loadTopics$ = this.actions$
  // // Listen for the 'LOGIN' action
  //   .ofType(topics.LOAD_TOPICS)
  //   // Map the payload into JSON to use as the request body
  //   .map(action => JSON.stringify(action.payload))
  //   .switchMap(payload => this.http.post('/auth', payload)
  //     // If successful, dispatch success action with result
  //       .map(res => ({ type: 'LOGIN_SUCCESS', payload: res.json() }))
  //       // If request fails, dispatch failed action
  //       .catch(() => Observable.of({ type: 'LOGIN_FAILED' })),
  //   );

  constructor(private http: Http, private actions$: Actions) {
  }
}

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';
import {TopicsService} from '../services/topics-service/topics.service';
import * as topics from '../actions/topics';

@Injectable()
export class TopicsEffects {
  @Effect() loadTopics$ = this.actions$
  // Listen for the topics.LOAD_TOPICS action
    .ofType(topics.LOAD_TOPICS)
    .switchMap(() => this.topicsService.getTopics()
      // If successful, dispatch success action with result
      .map(payload => new topics.LoadTopicsSuccessAction(payload))
        // If request fails, dispatch failed action
      .catch(error => {
        this.snackBar.open('Cannot receive topics', 'close', {duration: 3000});
        return Observable.of(new topics.LoadTopicsFailAction(error));
      }));

  constructor(
    private actions$: Actions,
    private snackBar: MdSnackBar,
    private topicsService: TopicsService,
    ) {
  }
}

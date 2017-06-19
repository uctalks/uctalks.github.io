import 'rxjs/add/operator/let';
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import Topic from '../models/topic';
import { LoadTopicsAction } from '../actions/topics';
import { LoadUsersAction } from '../actions/users';


@Component({
  selector: 'app-topics-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topics [topics]="topics$ | async"></app-topics>
  `,
})
export class TopicsPageComponent implements OnInit {
  topics$: Observable<Topic[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.topics$ = store.select(fromRoot.getTopicsEntities);
  }

  ngOnInit() {
    this.store.dispatch(new LoadTopicsAction());
    this.store.dispatch(new LoadUsersAction());
  }
}


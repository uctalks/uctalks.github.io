import 'rxjs/add/operator/let';
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers/';
import { LoadTopicsAction } from '../actions/topics';
import { LoadUsersAction } from '../actions/users';
import Topic from '../models/topic';
import User from '../models/user';


@Component({
  selector: 'app-topics-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topics
      [topics]="topics$ | async"
      [users]="users$ | async"
      [currentUserId]="currentUserId$ | async">
    </app-topics>
  `,
})
export class TopicsPageComponent implements OnInit {
  topics$: Observable<Topic[]>;
  users$: Observable<User[]>;
  currentUserId$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.topics$ = store.select(fromRoot.getTopics);
    this.users$ = store.select(fromRoot.getUsers);
    this.currentUserId$ = store.select(fromRoot.getCurrentUserId);
  }

  ngOnInit() {
    this.store.dispatch(new LoadTopicsAction());
    this.store.dispatch(new LoadUsersAction());
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromTopics from '../reducers';
import * as fromAuth from '../../auth/reducers';
import { LoadTopicsAction, LoadUsers } from '../actions';
import { ITopic, IUser } from '../models';

@Component({
  selector: 'app-topics-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topics
      [topics]="topics$ | async"
      [users]="users$ | async"
      [currentUserId]="currentUserId$ | async"
    >
    </app-topics>
  `,
})
export class TopicsPageComponent implements OnInit {
  topics$: Observable<ITopic[]>;
  users$: Observable<ReadonlyArray<IUser>>;
  currentUserId$: Observable<string>;

  constructor(private readonly store: Store<fromTopics.IState>) {
    this.topics$ = store.pipe(select(fromTopics.getTopics));
    this.users$ = store.pipe(select(fromTopics.getUsers));
    this.currentUserId$ = store.pipe(select(fromAuth.getCurrentUserId));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTopicsAction());
    this.store.dispatch(new LoadUsers());
  }
}

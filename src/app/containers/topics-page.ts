import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import Topic from '../models/topic';


@Component({
  selector: 'app-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topics [topics]="topics$ | async"></app-topics>
  `,
})
export class TopicsPageComponent {
  topics$: Observable<Topic[]>;

  constructor(store: Store<fromRoot.State>) {
    this.topics$ = store.select(fromRoot.getTopics);
  }
}

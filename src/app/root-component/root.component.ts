import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers/index';
import * as fromAuth from '../auth/reducers/index';
import { CheckLogin } from '../auth/actions/auth';

@Component({
  selector: 'uct-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./root.component.scss'],
  template: `
    <div class="wrapper mat-app-background">
      <app-header [currentUserId]="currentUserId$ | async"></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class RootComponent implements OnInit {
  public currentUserId$: Observable<string>;

  constructor(private store: Store<fromRoot.IState>) {
    this.currentUserId$ = store.select(fromAuth.getCurrentUserId);
  }

  ngOnInit() {
    this.store.dispatch(new CheckLogin());
  }
}

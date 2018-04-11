import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers/index';
import * as fromTopics from '../topics/reducers/index';
import * as fromAuth from '../auth/reducers/index';
import { CheckUserLoginAction } from '../auth/actions/auth';

@Component({
  selector: 'uct-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./root.component.scss'],
  template: `
    <div class="wrapper mat-app-background">
      <app-header [currentUserId]="currentUserId$ | async"></app-header>

      <mat-progress-bar 
        *ngIf="spinnerIsVisible$ | async" 
        class="spinner" 
        mode="indeterminate" 
        color="accent"
      >
      </mat-progress-bar>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class RootComponent implements OnInit {
  public spinnerIsVisible$: Observable<boolean>;
  public currentUserId$: Observable<string>;

  constructor(private store: Store<fromRoot.IState>) {
    this.spinnerIsVisible$ = store.select(fromTopics.getSpinnerIsVisible);
    this.currentUserId$ = store.select(fromAuth.getCurrentUserId);
  }

  ngOnInit() {
    this.store.dispatch(new CheckUserLoginAction());
  }
}

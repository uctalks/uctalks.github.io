import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './reducers/';
import { CheckUserLoginAction } from './actions/currentUserId';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper mat-app-background">
      <app-header [currentUserId]="currentUserId$ | async"></app-header>

      <md-progress-bar *ngIf="spinnerIsVisible$ | async" class="spinner" mode="indeterminate" color="accent"></md-progress-bar>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public spinnerIsVisible$: Observable<boolean>;
  public currentUserId$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.spinnerIsVisible$ = store.select(fromRoot.getSpinnerIsVisible);
    this.currentUserId$ = store.select(fromRoot.getCurrentUserId);
  }

  ngOnInit() {
    this.store.dispatch(new CheckUserLoginAction());
  }
}

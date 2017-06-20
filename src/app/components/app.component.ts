import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth-service/auth.service';
import * as fromRoot from '../reducers/index';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper mat-app-background">
      <app-header></app-header>

      <md-progress-bar *ngIf="spinnerIsVisible$ | async" class="spinner" mode="indeterminate" color="accent"></md-progress-bar>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public spinnerIsVisible$: Observable<boolean>;

  constructor(private auth: AuthService, private store: Store<fromRoot.State>) {
    this.spinnerIsVisible$ = store.select(fromRoot.getSpinnerIsVisible);
    auth.handleAuthentication();
  }
}

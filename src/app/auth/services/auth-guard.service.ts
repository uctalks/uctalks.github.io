import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.IState>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authenticated => {
        if (!authenticated) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}

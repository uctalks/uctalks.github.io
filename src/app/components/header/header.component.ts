import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/';
import { LogoutAction } from '../../actions/currentUserId';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currentUserId: string;

  constructor(public auth: AuthService, private store: Store<State>) {}

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}

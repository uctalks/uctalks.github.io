import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/';
import { LogoutAction } from '../../actions/currentUserId';
import { AuthService } from '../../services/auth-service/auth.service';
import { AutomationLocator } from '../../../../automation-locators.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currentUserId: string;

  public headerTittleLocator: AutomationLocator = AutomationLocator.HeaderTitle;

  constructor(public auth: AuthService, private store: Store<State>) {}

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}

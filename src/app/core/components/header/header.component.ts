import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '../../../auth/actions/auth';
import { AuthService } from '../../../auth/services/auth.service';
import { AutomationLocator } from '../../../../../automation-locators.enum';
import { IState } from '../../../auth/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currentUserId: string;

  public headerTittleLocator: AutomationLocator = AutomationLocator.HeaderTitle;

  constructor(public auth: AuthService, private store: Store<IState>) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}

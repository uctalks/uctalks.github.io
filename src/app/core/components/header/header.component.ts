import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from '../../../auth/actions/auth';
import { AuthService } from '../../../auth/services/auth.service';
import { AutomationLocator } from '../../../../../automation-locators.enum';
import { IAuthState } from '../../../auth/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currentUserId: string;

  public headerTittleLocator: AutomationLocator = AutomationLocator.HeaderTitle;

  constructor(public auth: AuthService, private store: Store<IAuthState>) {}

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}

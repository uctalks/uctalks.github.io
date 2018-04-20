import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'uct-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a mat-raised-button color="accent" (click)="login()">
      <mat-icon>vpn_key</mat-icon>
      Login via GL account
    </a>
  `
})
export class LoginPageComponent {
  constructor(private readonly auth: AuthService) {

  }

  public login(): void {
    this.auth.login();
  }
}

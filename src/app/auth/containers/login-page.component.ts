import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'uct-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <h1>Use your GlobalLogic account to login</h1>
      <a mat-raised-button color="accent" (click)="login()">
        <mat-icon>vpn_key</mat-icon>
        Login
      </a>
    </main>
  `,
  styles: [
      `
      main {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    `
  ],
})
export class LoginPageComponent {
  constructor(private readonly auth: AuthService) {

  }

  public login(): void {
    this.auth.login();
  }
}

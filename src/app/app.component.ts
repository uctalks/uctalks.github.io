import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public notificationOptions = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: false
  };

  constructor(public auth: Auth) { }

}

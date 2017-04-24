import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ucTalks';

  constructor(public auth: Auth) {}
}

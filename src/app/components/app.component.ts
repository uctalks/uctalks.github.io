import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public spinnerIsVisible = true;

  constructor(public auth: AuthService, public spinner: SpinnerService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.spinner.visible$.subscribe(flag => this.spinnerIsVisible = flag);
  }
}

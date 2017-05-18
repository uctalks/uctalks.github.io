import { Component, OnInit } from '@angular/core';
import { Auth } from './services/auth-service/auth.service';
import { SpinnerService } from './services/spinner-service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public notificationOptions = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    showProgressBar: false
  };

  public spinnerIsVisible = true;

  constructor(public auth: Auth, public spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.visible$.subscribe(flag => this.spinnerIsVisible = flag);
  }
}

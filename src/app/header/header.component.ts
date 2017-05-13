import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: Auth) {}

  ngOnInit() {
  }

}

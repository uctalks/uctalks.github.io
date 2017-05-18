import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TopicsComponent} from './topics/topics.component';
import {TopicPopupComponent} from './topic-popup/topic-popup.component';

import {TopicsService} from './services/topics-service/topics.service';
import {Auth} from './services/auth-service/auth.service';

import {SimpleNotificationsModule} from 'angular2-notifications';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdMenuModule,
  MdButtonModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';
import 'hammerjs';

import { MdDataTableModule } from 'ng2-md-datatable';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopicsComponent,
    TopicPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    MdTooltipModule,
    MdDataTableModule,
  ],
  providers: [
    TopicsService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    Auth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

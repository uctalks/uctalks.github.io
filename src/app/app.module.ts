import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';

import {AuthConfig, AuthHttp} from 'angular2-jwt';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TopicsComponent} from './topics/topics.component';
import {TopicComponent} from './topic/topic.component';
import {TopicPopupComponent} from './topic-popup/topic-popup.component';

import {TopicsService} from './services/topics-service/topics.service';
import {Auth} from './services/auth-service/auth.service';

import {SimpleNotificationsModule} from 'angular2-notifications';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopicsComponent,
    TopicComponent,
    TopicPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
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

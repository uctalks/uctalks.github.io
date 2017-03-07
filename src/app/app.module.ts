import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThemesComponent } from './themes/themes.component';

import { TopicsService } from './services/topics-service/topics.service';
import { Auth } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThemesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TopicsService,
    AUTH_PROVIDERS,
    Auth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

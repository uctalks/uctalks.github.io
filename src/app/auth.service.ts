import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('oFfXrxqSipz8nGcK2d6tX8ZBltoBWic7', 'stativka.eu.auth0.com', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', authResult => {
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          throw new Error(error);
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });

    // @TODO add some notifications like flash messages...
    this.lock.on('authorization_error', error => alert(error.error_description));
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }

  public get username() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    return profile ? profile.given_name : null;
  }
}

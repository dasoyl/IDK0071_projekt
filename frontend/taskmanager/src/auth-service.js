import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import EventEmitter from 'eventemitter3';


@inject(Router)
export class AuthService {
  auth0 = new auth0.WebAuth({
    domain: 'tarkvara.eu.auth0.com',
    clientID: 'Jt08nYeh7h3ScU78xbg10b739SigIEKn',
    redirectUri: 'http://localhost:9000/callback',
    audience: 'https://tarkvara.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
  authNotifier = new EventEmitter();

  constructor(Router) {
    this.router = Router;
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate('/');
        this.authNotifier.emit('authChange', { authenticated: true });
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate('/');
    this.authNotifier.emit('authChange', false);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

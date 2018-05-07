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
    scope: 'openid profile email'
  });

  login() {
    this.auth0.authorize();
  }
  authNotifier = new EventEmitter();

  constructor(Router) {
    this.router = Router;
  }

  decode (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate('/');
        this.authNotifier.emit('authChange', { authenticated: true });
        var id_token = authResult.idToken;
        var acc_token = authResult.accessToken;
        var decoded = this.decode(id_token);
        if (decoded.nickname){
          this.username = decoded.nickname;
        } else{
          this.username = decoded.name;
        }
        console.log("Username:");
        console.log(this.username);
      } else if (err) {
        console.log(err);
      }


    });
  }

  getUsername(id){
    var tkn = localStorage.getItem('access_token');
    console.log(tkn);
    console.log(userId);
    var auth0Manage = new auth0.Management({
      domain: 'tarkvara.eu.auth0.com',
      token: tkn
    });
    auth0Manage.getUser(id, function(a) {
      console.log("callbacked user");
      console.log(a);
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

import { inject } from 'aurelia-framework';
import { AuthService } from './auth-service';

@inject(AuthService)
export class Callback {
  constructor(AuthService) {
    this.auth = AuthService;
    this.auth.handleAuthentication();
  }
}

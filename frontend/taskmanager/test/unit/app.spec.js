import {App} from '../../src/app';

describe('App', () => {
  it('repects authenticated state from AuthService', () => {
    const auth = {
      isAuthenticated: () => {
        return true;
      },
      authNotifier: {
        on: ()=>{}
      }
    };
    expect(new App(auth).authenticated).toBe(true);
  });
});

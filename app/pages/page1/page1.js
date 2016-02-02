import {Page} from 'ionic/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
})
export class Page1 {
  username: string;
  password: string;
  constructor(public http: Http) {

  }
  logError(err) {
    console.error('Error: ' + err);
  }
  saveJwt(jwt) {
    if(jwt) {
      localStorage.setItem('id_token', jwt)
    }
  }
  setToken = function(credentials) {
    console.log(credentials);
    localStorage.setItem('token', btoa(credentials.email + ':' + credentials.password)); // jshint ignore:line
  }
  getToken = function() {
    return localStorage.getItem('token');
  }
  submit(email, password) {
    let creds = JSON.stringify({ email: email, password: password});
    console.log(creds);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://brewday.carbonrail.com/api/v1/sessions', creds, {
        headers: headers
        })
    .subscribe(
        data => {
          this.setToken(creds);
          email.value = null;
          password.value = null;
        },
        err => this.logError(err),
        () => console.log('Authentication Complete')
        );
  }
}

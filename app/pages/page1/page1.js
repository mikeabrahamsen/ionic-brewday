import {Page, NavController} from 'ionic/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import {TabsPage} from '../tabs/tabs';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
})
export class Page1 {
  username: string;
  password: string;
  constructor(http: Http, nav: NavController) {
    this.nav = nav;
    this.http = http;
  }
  logError(err) {
    console.error('Error: ' + err);
  }
  setToken = function(credentials) {
    localStorage.setItem('token', btoa(credentials.email + ':' + credentials.password)); // jshint ignore:line
  }
  submit(email, password) {
    let creds = JSON.stringify({ email: email, password: password});

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://brewday.carbonrail.com/api/v1/sessions', creds, {
        headers: headers
        })
    .subscribe(
        data => {
          this.setToken(JSON.parse(creds));
        },
        err => this.logError(err),
        () => this.nav.push(TabsPage);
        );
  }
}

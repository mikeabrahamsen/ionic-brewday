import {Page, NavController} from 'ionic-framework/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Page({
  templateUrl: 'build/pages/recipes/additions/grains.html'
})
export class Grains{
  static get parameters(){
    return [[Http], [NavController]];
  }
  constructor(http, nav) {
    this.http = http;
    this.nav = nav;
    this.getGrains();
  }
  getGrains() {
    this.http.get('http://brewday.carbonrail.com/api/v1/grains', {
        })
      .subscribe(
          data => this.grainList = JSON.parse(data._body),
          err => this.logError(err)
          );
  }

  navHops(){
    this.nav.push(Hops);
  }
}

@Page({
  templateUrl: 'build/pages/recipes/additions/hops.html'
})
export class Hops{
  static get parameters(){
    return [[Http], [NavController]];
  }
  constructor(http, nav) {
    this.http = http;
    this.nav = nav;
    this.getHops();
  }
  getHops() {
    this.http.get('http://brewday.carbonrail.com/api/v1/hops', {
        })
      .subscribe(
          data => this.hopList = JSON.parse(data._body),
          err => this.logError(err)
          );
  }
}

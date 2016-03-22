import {Page, NavController} from 'ionic-angular';
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
    this.original_additions = [];
    this.grains = []
    this.grainList = [];

    this.setDefaultGrains();
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
  setDefaultGrains(){
    if (this.original_additions.length < 1){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.grains.push(newAddition);
    }
  }
  addNewGrain(){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.grains.push(newAddition);
  }
  removeAddition(addition){
    this.grains.splice(this.grains.indexOf(addition), 1)
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
    this.hopList = [];
    this.hops = [];
    this.original_additions = [];

    this.setDefaultHops();
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

  setDefaultHops(){
    if (this.original_additions.length < 1){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.hops.push(newAddition);
    }
  }
  addNewHop(){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.hops.push(newAddition);
  }
  removeAddition(addition){
    this.hops.splice(this.hops.indexOf(addition), 1)
  }
}

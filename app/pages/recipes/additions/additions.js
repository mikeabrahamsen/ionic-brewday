import {Page, NavController, NavParams} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Page({
  templateUrl: 'build/pages/recipes/additions/grains.html'
})
export class Grains{
  static get parameters(){
    return [[Http], [NavController], [NavParams]];
  }
  constructor(http, nav, navParams) {
    this.http = http;
    this.nav = nav;
    this.original_additions = [];
    this.grains = []
    this.grainList = [];
    this.recipe = navParams.get('recipe');

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
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0, time: 0};
      this.grains.push(newAddition);
    }
  }
  addNewGrain(){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0, time: 0};
      this.grains.push(newAddition);
  }
  removeAddition(addition){
    this.grains.splice(this.grains.indexOf(addition), 1)
  }

  navHops(){
    this.recipe.grains = this.grains;
    console.log(this.grains);
    this.nav.push(Hops, {recipe: this.recipe});
  }
}

@Page({
  templateUrl: 'build/pages/recipes/additions/hops.html'
})
export class Hops{
  static get parameters(){
    return [[Http], [NavController], [NavParams]];
  }
  constructor(http, nav, navParams) {
    this.http = http;
    this.nav = nav;
    this.hopList = [];
    this.hops = [];
    this.original_additions = [];
    this.recipe = navParams.get('recipe');

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
  saveRecipe(){
    this.recipe.hops = this.hops;
    let newRecipe = JSON.stringify({
      name: this.recipe.name,
      beer_type: this.recipe.beerType,
      equipment_id: this.recipe.equipment_id
    })

    var token = localStorage.getItem('token');
    var authHeader = new Headers();
    if(token) {
      authHeader.append('Authorization', 'Basic ' + token);
    }
    authHeader.append('Content-Type', 'application/json');
    this.http.post('http://brewday.carbonrail.com/api/v1/recipes',
        newRecipe, {
        headers: authHeader
        })
      .subscribe(
          data => this.submitAdditions(data._body),
          err => console.log(err)
          );
  }
  submitAdditions(recipe){
    recipe = JSON.parse(recipe);
    let http = this.http;
    this.recipe.grains.forEach(function(grain){
        grain.recipe_id = recipe.id;
        grain = JSON.stringify(grain);
        console.log(grain);

        var token = localStorage.getItem('token');
        var authHeader = new Headers();
        if(token) {
          authHeader.append('Authorization', 'Basic ' + token);
        }
        authHeader.append('Content-Type', 'application/json');
        http.post('http://brewday.carbonrail.com/api/v1/recipes/' + recipe.id + '/grains',
            grain, {
            headers: authHeader
            })
          .subscribe(
              data => console.log(data),
              err => console.log(err)
              );
        })

    this.recipe.hops.forEach(function(hop){
        hop.recipe_id = recipe.id;
        hop = JSON.stringify(hop);
        console.log(hop);

        var token = localStorage.getItem('token');
        var authHeader = new Headers();
        if(token) {
          authHeader.append('Authorization', 'Basic ' + token);
        }
        authHeader.append('Content-Type', 'application/json');
        http.post('http://brewday.carbonrail.com/api/v1/recipes/' + recipe.id + '/hops',
            hop, {
            headers: authHeader
            })
          .subscribe(
              data => console.log(data),
              err => console.log(err)
              );
        })
  }
}

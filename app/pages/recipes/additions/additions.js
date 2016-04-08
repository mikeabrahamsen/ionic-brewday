import {Page, NavController, NavParams} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

export class AdditionService{
  /* Create a blank addition if there are none in recipe */
  setDefaultAdditions(recipe, additionName){
    if (typeof(recipe[additionName]) === 'undefined' || recipe[additionName].length < 1){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.additions = [newAddition];
    }
    else{
      this.additions = recipe[additionName];
    }
    return this.additions;
  }

  saveRecipe(recipe, grains, hops){
    let newRecipe = JSON.stringify({
      name: this.recipe.name,
      beer_type: this.recipe.beer_type,
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
          // submit the recipes for the given recipe
          data => this.submitAdditions(data._body, grains, hops),
          err => console.log(err)
          );
  }
  submitAdditions(recipe, grains, hops){
    recipe = JSON.parse(recipe);
    let http = this.http;
    grains.forEach(function(grain){
        grain.recipe_id = recipe.id;
        grain = JSON.stringify(grain);

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
        });

    hops.forEach(function(hop){
        hop.recipe_id = recipe.id;
        hop = JSON.stringify(hop);

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
        });
  }

}
@Page({
  templateUrl: 'build/pages/recipes/additions/grains.html',
  providers: [AdditionService]
})
export class Grains{
  static get parameters(){
    return [[Http], [NavController], [NavParams], [AdditionService]];
  }
  constructor(http, nav, navParams, additionService) {
    this.http = http;
    this.nav = nav;
    this.grains = []
    this.grainList = [];
    this.recipe = navParams.get('recipe');
    this.original_grains = this.recipe.grains;

    this.grains = additionService.setDefaultAdditions(this.recipe, 'grains');
    console.log(this.grains);
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
  addNewGrain(){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
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
  templateUrl: 'build/pages/recipes/additions/hops.html',
  providers: [AdditionService]
})
export class Hops{
  static get parameters(){
    return [[Http], [NavController], [NavParams], [AdditionService]];
  }
  constructor(http, nav, navParams, additionService) {
    this.http = http;
    this.nav = nav;
    this.hopList = [];
    this.hops = [];
    this.recipe = navParams.get('recipe');
    this.original_hops = this.recipe.hops;

    this.hops = additionService.setDefaultAdditions(this.recipe, 'hops');
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

  addNewHop(){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this.hops.push(newAddition);
  }
  removeAddition(addition){
    this.hops.splice(this.hops.indexOf(addition), 1)
  }
}

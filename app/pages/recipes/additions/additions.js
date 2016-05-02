import {Page, NavController, NavParams} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import {RecipeService} from '../recipe.service';
import {AdditionsService} from './additions.service';

@Page({
  templateUrl: 'build/pages/recipes/additions/grains.html',
  providers: [AdditionsService, RecipeService]
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
    this.additionService = additionService;

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
  saveRecipe(){
    this.recipe.grains = this.grains;
    this.additionService.saveRecipe(
      this.recipe);
  }
}

@Page({
  templateUrl: 'build/pages/recipes/additions/hops.html',
  providers: [AdditionsService, RecipeService]
})
export class Hops{
  static get parameters(){
    return [[Http], [NavController], [NavParams], [AdditionsService]];
  }
  constructor(http, nav, navParams, additionService) {
    this.http = http;
    this.nav = nav;
    this.hopList = [];
    this.hops = [];
    this.recipe = navParams.get('recipe');
    this.original_hops = this.recipe.hops;
    this.additionService = additionService;
    console.log(this.recipe);

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
  saveRecipe(){
    this.recipe.hops = this.hops;
    this.additionService.saveRecipe(
      this.recipe);
  }
}

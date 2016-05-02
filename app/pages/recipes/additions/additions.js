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
    return [[Http], [NavController], [NavParams], [AdditionsService]];
  }
  constructor(http, nav, navParams, additionsService) {
    this.http = http;
    this.nav = nav;
    this.grains = []
    this.grainList = [];
    this.recipe = navParams.get('recipe');
    this.original_grains = this.recipe.grains;
    this.additionsService = additionsService;

    this.grains = additionsService.setDefaultAdditions(this.recipe, 'grains');
    this.getGrains();
  }
  getGrains() {
      this.additionsService.getGrainOptions().subscribe(
          data => this.grainList = data,
          err => jonsole.log(err)
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
  constructor(http, nav, navParams, additionsService) {
    this.http = http;
    this.nav = nav;
    this.hopList = [];
    this.hops = [];
    this.recipe = navParams.get('recipe');
    this.original_hops = this.recipe.hops;
    this.additionsService = additionsService;

    this.hops = additionsService.setDefaultAdditions(this.recipe, 'hops');
    this.getHops();
  }
  getHops() {
    this.additionsService.getHopOptions().subscribe(
        data => this.hopList = data,
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

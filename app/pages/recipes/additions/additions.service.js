import {RecipeService} from '../recipe.service';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';

export class AdditionsService{
  static get parameters(){
    return [[RecipeService],[Http]];
  }
  constructor(recipeService, http){
    this.recipeService = recipeService;

    this.http = http;
    this.baseUrl = 'http://brewday.carbonrail.com/api/v1/'
  }
  /* Create a blank addition if there are none in recipe */
  setDefaultAdditions(recipe, additionName){
    if (typeof(recipe[additionName]) === 'undefined' || recipe[additionName].length < 1){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this[additionName] = [newAddition];
    }
    else{
      this[additionName] = recipe[additionName];
    }
    return this[additionName];
  }

  saveRecipe(recipe){
      this.recipeService.createRecipe(recipe).subscribe(
          // submit the recipes for the given recipe
          data => this.submitRecipeAdditions(data, recipe.grains, recipe.hops),
          err => console.log(err)
          );
  }

  submitRecipeAdditions(data, grains, hops){
    let rs = this.recipeService;
    let recipe = data;
    grains.forEach(function(grain){
      grain.recipe_id = recipe.id;
      rs.addGrainToRecipe(grain).subscribe(
          data => console.log(data),
          err => { this.grain_error = true }
          );
    });
    hops.forEach(function(hop){
      hop.recipe_id = recipe.id;
      rs.addHopToRecipe(hop).subscribe(
          data => console.log(data),
          err => { this.hop_error = true }
          );
    });
  }

  getGrainOptions(){
    return this.http.get(this.baseUrl + 'grains', {
    }).map(response => response.json());
  }

  getHopOptions(){
    return this.http.get(this.baseUrl + 'hops', {
    }).map(response => response.json());
  }

}

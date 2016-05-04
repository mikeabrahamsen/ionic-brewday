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

  getGrainOptions(){
    return this.http.get(this.baseUrl + 'grains', {
    }).map(response => response.json());
  }

  getHopOptions(){
    return this.http.get(this.baseUrl + 'hops', {
    }).map(response => response.json());
  }

}

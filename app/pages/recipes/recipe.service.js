import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';

export class RecipeService{
  static get parameters(){
    return [[Http]];
  }
  constructor(http) {
    this.http = http;
    this.baseUrl = 'http://brewday.carbonrail.com/api/v1/recipes/'

    var token = localStorage.getItem('token');
    this.authHeader = new Headers();
    this.authHeader.append('Content-Type', 'application/json');
    if(token) {
      this.authHeader.append('Authorization', 'Basic ' + token);
    }
  }

  getAllRecipes(){
    return this.http.get(this.baseUrl.slice(0, -1), {
        headers: this.authHeader}).map(response => response.json());
  }

  deleteRecipe(recipeId){
    return this.http.delete(this.baseUrl + recipeId, {
      headers: this.authHeader})
  }

  getHopsForRecipe(recipeId){
    return this.http.get(this.baseUrl + recipeId + "/hops", {
      headers: this.authHeader
    }).map(response => response.json());
  }

  getGrainsForRecipe(recipeId){
    return this.http.get(this.baseUrl + recipeId + "/grains", {
      headers: this.authHeader
    }).map(response => response.json());
  }

  createRecipe(recipe){
    let newRecipe = JSON.stringify({
      name: recipe.name,
      beer_type: recipe.beer_type,
      equipment_id: recipe.equipment_id
    });
    return this.http.post(this.baseUrl.slice(0, -1), newRecipe, {
      headers: this.authHeader
    }).map(response => response.json());
  }

  addGrainToRecipe(grain){
    return this.http.post(this.baseUrl + grain.recipe_id + '/grains',
        JSON.stringify(grain), {
          headers: this.authHeader
        }).map(response => response.json());
  }

  addHopToRecipe(hop){
    return this.http.post(this.baseUrl + hop.recipe_id + '/hops',
        JSON.stringify(hop), {
          headers: this.authHeader
        }).map(response => response.json());
  }

  saveRecipe(recipe){
      this.createRecipe(recipe).subscribe(
          // submit the recipes for the given recipe
          data => this.submitRecipeAdditions(data, recipe.grains, recipe.hops),
          err => console.log(err)
          );
  }

  submitRecipeAdditions(data, grains, hops){
    let rs = this;
    let recipe = data;
    grains.forEach(function(grain){
      if (grain.addition_id){
        grain.recipe_id = recipe.id;
        rs.addGrainToRecipe(grain).subscribe(
            data => console.log(data),
            err => { this.grain_error = true }
            );
      }
    });
    hops.forEach(function(hop){
      if (hop.addition_id !== undefined ){
        hop.recipe_id = recipe.id;
        rs.addHopToRecipe(hop).subscribe(
            data => console.log(data),
            err => { this.hop_error = true }
            );
      }
    });
  }
}

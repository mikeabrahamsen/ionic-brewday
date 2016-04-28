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
    this.authHeader.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl.slice(0, -1), newRecipe, {
      headers: this.authHeader
    }).map(response => response.json());
  }
}

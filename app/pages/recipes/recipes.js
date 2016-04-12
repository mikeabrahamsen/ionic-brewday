import {Page, NavController, Events} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import {RecipeView} from './recipe-view';
import {RecipeCreate} from './create/recipe-create';

@Page({
  templateUrl: 'build/pages/recipes/recipe-list.html'
})
export class Page2 {
  static get parameters(){
    return [[Http], [NavController], [Events]];
  }
  constructor(http, nav, events) {
    this.http = http;
    this.nav = nav;
    this.recipes = [];
    this.getRecipes();
    this.events = events;

    this.events.subscribe('reloadRecipeList',() => {
      this.getRecipes();
    });
  }
  logError(err) {
    console.error('Error: ' + err);
  }
  getRecipes() {

    var token = localStorage.getItem('token');
    var authHeader = new Headers();
    if(token) {
      authHeader.append('Authorization', 'Basic ' + token);
    }
    this.http.get('http://brewday.carbonrail.com/api/v1/recipes', {
        headers: authHeader
        })
      .subscribe(
          data => this.recipes= JSON.parse(data._body),
          err => this.logError(err)
          );
  }
  recipeSelected(recipe){
    this.recipe = recipe;
    this.nav.push(RecipeView, {recipe: recipe});
  }
  newRecipe(){
    this.nav.push(RecipeCreate, {recipe: undefined});
  }
}

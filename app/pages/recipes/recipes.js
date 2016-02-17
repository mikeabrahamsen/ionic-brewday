import {Page, NavController} from 'ionic/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import {RecipeView} from './recipe-view';
import {Page3} from './create/recipe-create';

@Page({
  templateUrl: 'build/pages/page2/page2.html'
})
export class Page2 {
  constructor(http: Http, nav: NavController) {
    this.http = http;
    this.nav = nav;
    this.recipes = [];
    this.getRecipes()
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
          err => this.logError(err),
          () => console.log('Recipes Gathered');
          );
  }
  recipeSelected(recipe){
    this.recipe = recipe;
    this.nav.push(RecipeView, {recipe: recipe});
  }
  newRecipe(){
    this.nav.push(Page3);
  }
}

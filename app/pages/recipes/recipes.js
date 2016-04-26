import {Page, NavController, Events} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';
import {RecipeView} from './recipe-view';
import {RecipeCreate} from './create/recipe-create';
import { RecipeService } from './recipe.service';


@Page({
  templateUrl: 'build/pages/recipes/recipe-list.html',
  providers: [RecipeService]
})
export class RecipeList{
  static get parameters(){
    return [[NavController], [Events], [RecipeService]];
  }
  constructor(nav, events, recipeService) {
    this.nav = nav;
    this.recipes = [];
    this.events = events;
    this.recipeService = recipeService;
    this.getRecipes();

    this.events.subscribe('reloadRecipeList',() => {
      this.getRecipes();
    });
  }
  getRecipes() {
    var recipeStream = this.recipeService.getAllRecipes().subscribe(
          data => this.recipes = data,
          err => { this.recipe_error = true }
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

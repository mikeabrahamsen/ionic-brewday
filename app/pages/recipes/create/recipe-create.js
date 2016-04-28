import {Page, NavController, NavParams} from 'ionic-angular';
import {Grains} from '../additions/additions';
import {RecipeService} from '../recipe.service';

@Page({
  templateUrl: 'build/pages/recipes/create/recipe-create.html',
  providers: [RecipeService]
})
export class RecipeCreate{
  static get parameters(){
    return [[NavController], [NavParams], [RecipeService]];
  }
  constructor(nav, navParams, recipeService) {
    this.nav = nav;
    this.recipe = navParams.get('recipe');
    this.recipeService = recipeService;
    if(!this.recipe){
      this.recipe = {id: undefined, equipment_id: 1}
    }
  }
  navGrains(){
    this.nav.push(Grains, {recipe: this.recipe});
  }
  createRecipe(){
    this.recipeService.createRecipe(this.recipe).subscribe(
        data => this.navGrains());
  }
}

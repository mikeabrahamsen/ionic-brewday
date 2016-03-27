import {Page, NavController} from 'ionic-angular';
import {Grains} from '../additions/additions';

@Page({
  templateUrl: 'build/pages/recipes/create/recipe-create.html'
})
export class RecipeCreate{
  static get parameters(){
    return [NavController];
  }
  constructor(nav) {
    this.nav = nav;
    this.recipe = {};
  }
  navGrains(){
    this.createRecipe()
    this.nav.push(Grains, {recipe: this.recipe});
  }
  createRecipe(){
    this.recipe.name = this.name;
    this.recipe.beerType = this.beerType;
    this.recipe.equipment_id = 1; // not implemented
  }
}

import {Page, NavController, NavParams} from 'ionic-angular';
import {Grains} from '../additions/additions';

@Page({
  templateUrl: 'build/pages/recipes/create/recipe-create.html'
})
export class RecipeCreate{
  static get parameters(){
    return [[NavController], [NavParams]];
  }
  constructor(nav, navParams) {
    this.nav = nav;
    this.recipe = navParams.get('recipe');
    if(!this.recipe){
      this.recipe = {id: undefined}
    }
    console.log(this.recipe);
  }
  navGrains(){
    this.createRecipe()
    this.nav.push(Grains, {recipe: this.recipe});
  }
  createRecipe(){
    this.recipe.name = this.name;
    this.recipe.beer_type = this.beer_type;
    this.recipe.equipment_id = 1; // not implemented
  }
}

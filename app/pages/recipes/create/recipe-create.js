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
  }
  navGrains(){
    this.nav.push(Grains);
  }
  saveRecipe(){
    console.log(this.name);
    console.log(this.beerType);
  }
}

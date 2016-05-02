import {Page, NavController, NavParams, Events} from 'ionic-angular';
import {CalculatorService} from './calculator';
import {RecipeCreate} from './create/recipe-create';
import {RecipeService} from './recipe.service';


@Page({
  templateUrl: 'build/pages/recipes/recipe-view.html',
  providers: [CalculatorService, RecipeService]

})
export class RecipeView{
  static get parameters(){
    return [[NavController], [NavParams], [CalculatorService], [Events],
    [RecipeService]];
  }
  constructor(nav, navParams, calc, events, recipeService) {
    this.nav = nav;
    this.calc = calc;
    this.recipe = navParams.get('recipe');
    this.grains = [];
    this.hops = [];
    this.events = events;
    this.recipeService = recipeService;

    this.getGrains();
    this.getHops();
  }

  /* Calculate the total grains used and update calculator */
  grainTotal(grains){
    let total = 0;
    for (var grain of grains){
      total += grain.amount;
    }
    this.calc.calculateWaterVol(total);
    this.totalVol = this.calc.totalVol;
    this.mashVol = this.calc.mashVol;
    this.spargeVol = this.calc.spargeVol;
    this.grainBill = total;
    return total;
  }

  /* Get the grains for the recipe */
  getGrains(){
    this.recipeService.getGrainsForRecipe(this.recipe.id).subscribe(
        data => {this.recipe.grains = data; this.grainTotal(this.recipe.grains)},
        err => this.grain_error = true
        );
  }

  /* Get the hops for the recipe */
  getHops(){
    this.recipeService.getHopsForRecipe(this.recipe.id).subscribe(
        data => this.recipe.hops= data,
        err => this.hop_error = true
        );
  }

  /* Move to edit recipe page */
  editRecipe(){
    this.nav.push(RecipeCreate, {recipe: this.recipe});
  }

  /* Delete the recipe */
  deleteCurrentRecipe(){
    this.recipeService.deleteRecipe(this.recipe.id).subscribe
      (
       data => {
         this.events.publish('reloadRecipeList');
         this.nav.pop();
       },
       err => this.delete_error = true
      );
  }

}

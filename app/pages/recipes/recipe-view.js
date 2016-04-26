import {Page, NavController, NavParams, Events} from 'ionic-angular';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { CalculatorService } from './calculator';
import {RecipeCreate} from './create/recipe-create';
import { RecipeService } from './recipe.service';


@Page({
  templateUrl: 'build/pages/recipes/recipe-view.html',
  providers: [CalculatorService, RecipeService]

})
export class RecipeView{
  static get parameters(){
    return [[Http], [NavController], [NavParams], [CalculatorService], [Events],
    [RecipeService]];
  }
  constructor(http, nav, navParams, calc, events, recipeService) {
    this.http = http;
    this.nav = nav;
    this.calc = calc;
    this.recipe = navParams.get('recipe');
    this.grains = [];
    this.hops = [];
    this.events = events;
    this.recipeService = recipeService;

    this.baseUrl = 'http://brewday.carbonrail.com/api/v1/recipes/'
    var token = localStorage.getItem('token');

    this.authHeader = new Headers();
    if(token) {
      this.authHeader.append('Authorization', 'Basic ' + token);
    }

    this.getGrains();
    this.getHops();
  }

  /* Calculate the total grains used and update calculator */
  grainTotal(){
    let total = 0;
    for (var grain of this.grains){
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
    let baseUrl = this.baseUrl;
    let authHeader = this.authHeader;

    this.http.get(baseUrl + this.recipe.id + "/grains", {
        headers: authHeader
        })
    .subscribe(
        data => this.recipe.grains = JSON.parse(data._body),
        err => this.logError(err)
        );
  }

  /* Get the hops for the recipe */
  getHops(){
    let baseUrl = this.baseUrl;
    let authHeader = this.authHeader;

    this.http.get(baseUrl + this.recipe.id + "/hops", {
          headers: authHeader
        })
    .subscribe(
        data => this.recipe.hops= JSON.parse(data._body),
        err => this.logError(err)
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

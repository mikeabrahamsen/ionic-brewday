import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { CalculatorService } from './calculator';


@Page({
  templateUrl: 'build/pages/recipes/recipe-view.html',
  providers: [CalculatorService]

})
export class RecipeView{
  static get parameters(){
    return [[Http], [NavController], [NavParams], [CalculatorService]];
  }
  constructor(http, nav, navParams, calc) {
    this.http = http;
    this.nav = nav;
    this.calc = calc;
    this.recipe = navParams.get('recipe');
    this.grains = [];
    this.hops = [];
    this.getGrains();
    this.getHops();
  }
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
  getGrains(){
    var token = localStorage.getItem('token');
    var authHeader = new Headers();
    if(token) {
      authHeader.append('Authorization', 'Basic ' + token);
    }
    this.http.get('http://brewday.carbonrail.com/api/v1/recipes/' + this.recipe.id + "/grains", {
        headers: authHeader
        })
      .subscribe(
          data => this.grains = JSON.parse(data._body),
          err => this.logError(err)
          );
  }
  getHops(){
    var token = localStorage.getItem('token');
    var authHeader = new Headers();
    if(token) {
      authHeader.append('Authorization', 'Basic ' + token);
    }
    this.http.get('http://brewday.carbonrail.com/api/v1/recipes/' + this.recipe.id + "/hops", {
        headers: authHeader
        })
      .subscribe(
          data => this.hops= JSON.parse(data._body),
          err => this.logError(err)
          )}
}

import {Page, NavController, NavParams} from 'ionic/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { CalculatorService } from './calculator';


@Page({
  templateUrl: 'build/pages/page2/recipe-view.html',
  providers: [CalculatorService]

})
export class RecipeView{
  constructor(http: Http, nav: NavController, navParams: NavParams, calc: CalculatorService) {
    this.http = http;
    this.nav = nav;
    this.recipe = navParams.get('recipe');
    this.grains = [];
    this.hops = [];
    this.getGrains();
    this.getHops();
  }
  grainTotal = function(){
    let total = 0;
    for (var grain of this.grains){
      total += grain.amount;
    }
    calc.calculateWaterVol(total);
    this.totalVol = calc.totalVol;
    this.mashVol = calc.mashVol;
    this.spargeVol = calc.spargeVol;
    this.grainBill = total;
    return total;
  }
  getGrains = function(){
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
          err => this.logError(err),
          () => console.log(this.grains);
          );
  }
  getHops = function(){
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
          err => this.logError(err),
          () => console.log(this.hops);
          );
  }
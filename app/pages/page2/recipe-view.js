import {Page, NavController, NavParams} from 'ionic/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page2/recipe-view.html'
})
export class RecipeView{
  constructor(http: Http, nav: NavController, navParams: NavParams) {
    this.http = http;
    this.nav = nav;
    this.recipe = navParams.get('recipe');
    this.grains = [];
    this.hops = [];
    this.getGrains();
    this.getHops();
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

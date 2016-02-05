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

    this.totalVol = 0;
    this.mashVol = 0;
    this.spargeVol = 0;

    this.details = {
      batchSize: 5,
      boilTime: 60,
      mashThickness: 1.33
    };

    this.equipmentProfile = {
      name: "default profile",
      trubLoss: 0.5,
      equipmentLoss: 1,
      fermenterLoss: 0,
    };

    this.grainBill = 0;
    this.grainTemp = 65;
  }
  grainTotal = function(){
    let total = 0;
    for (var grain of this.grains){
      total += grain.amount;
    }
    this.calculateWaterVol(total);
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

  calculateWaterVol = function(grainBill){
    var batchSize = this.details.batchSize;
    var bt = this.details.boilTime;
    var trubLoss = this.equipmentProfile.trubLoss;
    let equipmentLoss = this.equipmentProfile.equipmentLoss;
    var mashThickness = this.details.mashThickness;

    var ga = grainAbsorbtion(grainBill);
    var pv = preBoilVol(bt, batchSize, trubLoss);
    var tv = totalVol(pv, ga, equipmentLoss);
    var mv = mashVol(mashThickness, grainBill);
    var sv = spargeVol(tv, mv);

    this.totalVol = Math.round(tv*100) / 100;
    this.mashVol = Math.round(mv*100) / 100;
    this.spargeVol = Math.round(sv*100) / 100;
  };
  calculateStrikeTemp = function(targetTemp){
    var strikeTemp = (0.2 / this.details.mashThickness)*(targetTemp - this.grainTemp) + targetTemp;
    return Math.round(strikeTemp*10) / 10;
  };
  function grainAbsorbtion(grainBill){
    return 0.13 * grainBill;
  }
  function preBoilVol(boilTime, batchSize, trubLoss){
    var wsFactor = shrinkageFactor(0.04);
    var ev = evaporateFactor(boilTime);
    return ((batchSize + trubLoss) / wsFactor) / ev;
  }
  function evaporateFactor(boilTime){
    return 1-(0.10 * (boilTime / 60));
  }
  function shrinkageFactor(percent){
    return 1-percent;
  }
  function totalVol(preBoilVol, grainAbsorbtion, equipmentLoss){
    return preBoilVol + grainAbsorbtion + equipmentLoss;
  }
  function mashVol(mashThickness, grainBill){

    return mashThickness * grainBill * 0.25;
  }
  function spargeVol(totalVol, mashVol){
    return totalVol - mashVol;
  }

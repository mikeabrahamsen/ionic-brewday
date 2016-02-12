export class CalculatorService{
  constructor(){
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
  calculateWaterVol(grainBill){
    var batchSize = this.details.batchSize;
    var bt = this.details.boilTime;
    var trubLoss = this.equipmentProfile.trubLoss;
    let equipmentLoss = this.equipmentProfile.equipmentLoss;
    var mashThickness = this.details.mashThickness;

    var ga = this.grainAbsorbtion(grainBill);
    var pv = this.preBoilVol(bt, batchSize, trubLoss);
    var tv = this.totalVolume(pv, ga, equipmentLoss);
    var mv = this.mashVolume(mashThickness, grainBill);
    var sv = this.spargeVolume(tv, mv);

    this.totalVol = Math.round(tv*100) / 100;
    this.mashVol = Math.round(mv*100) / 100;
    this.spargeVol = Math.round(sv*100) / 100;
  }
  calculateStrikeTemp(targetTemp){
    var strikeTemp = (0.2 / this.details.mashThickness)*(targetTemp - this.grainTemp) + targetTemp;
    return Math.round(strikeTemp*10) / 10;
  }
  grainAbsorbtion(grainBill){
    return 0.13 * grainBill;
  }
  preBoilVol(boilTime, batchSize, trubLoss){
    var wsFactor = this.shrinkageFactor(0.04);
    var ev = this.evaporateFactor(boilTime);
    return ((batchSize + trubLoss) / wsFactor) / ev;
  }
  evaporateFactor(boilTime){
    return 1-(0.10 * (boilTime / 60));
  }
  shrinkageFactor(percent){
    return 1-percent;
  }
  totalVolume(preBoilVol, grainAbsorbtion, equipmentLoss){
    return preBoilVol + grainAbsorbtion + equipmentLoss;
  }
  mashVolume(mashThickness, grainBill){

    return mashThickness * grainBill * 0.25;
  }
  spargeVolume(totalVol, mashVol){
    return totalVol - mashVol;
  }
}

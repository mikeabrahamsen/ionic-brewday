import {RecipeService} from '../recipe.service';

export class AdditionsService{
  static get parameters(){
    return [[RecipeService]];
  }
  constructor(recipeService){
    this.recipeService = recipeService;
  }
  /* Create a blank addition if there are none in recipe */
  setDefaultAdditions(recipe, additionName){
    if (typeof(recipe[additionName]) === 'undefined' || recipe[additionName].length < 1){
      var newAddition = {'recipe_id': undefined, 'brew_stage': 0, amount: 0};
      this[additionName] = [newAddition];
    }
    else{
      this[additionName] = recipe[additionName];
    }
    return this.additions;
  }

  saveRecipe(recipe){
      this.recipeService.createRecipe(recipe).subscribe(
          // submit the recipes for the given recipe
          data => this.submitRecipeAdditions(data, recipe.grains, recipe.hops),
          err => console.log(err)
          );
  }

  submitRecipeAdditions(recipe, grains, hops){
    let rs = this.recipeService;
    grains.forEach(function(grain){
        grain.recipe_id = recipe.id;
        grain = JSON.stringify(grain);
        rs.addGrainToRecipe(grain).subscribe(
            data => grain = data,
            err => { this.grain_error = true }
            );
  });
    hops.forEach(function(hop){
        hop.recipe_id = recipe.id;
        hop = JSON.stringify(hop);
  });
  }

}

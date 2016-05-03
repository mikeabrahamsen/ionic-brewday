import {
  beforeEach,
  it,
  inject,
  expect,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {provide, Injector} from 'angular2/core';
import {RecipeService} from '../recipe.service';
import {AdditionsService} from './additions.service';

describe('AdditionsService', function () {
  let injector,
  mockBackend;
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      AdditionsService,
      RecipeService,
    ];

  });
  var hopData = [{
    "addition_id": 151,
    "addition_type": "hop",
    "amount": 1.5,
    "brew_stage": 0,
    "id": 53,
    "name": "Centennial",
    "recipe_id": 4,
    "region": null,
    "time": 1
  },
  {
    "addition_id": 151,
    "addition_type": "hop",
    "amount": 1.5,
    "brew_stage": 0,
    "id": 54,
    "name": "Centennial",
    "recipe_id": 4,
    "region": null,
    "time": 60
  }]
  var grainData = [{
    "addition_id": 132,
    "addition_type": "grain",
    "amount": 2.0,
    "brew_stage": 0,
    "id": 51,
    "name": "Munich",
    "recipe_id": 4,
    "region": "United Kingdom",
    "time": 0
  },
  {
    "addition_id": 14,
    "addition_type": "grain",
    "amount": 1.0,
    "brew_stage": 0,
    "id": 52,
    "name": "Caramel / Crystal 60L",
    "recipe_id": 4,
    "region": "American",
    "time": 0
  },
  {
    "addition_id": 27,
    "addition_type": "grain",
    "amount": 6.75,
    "brew_stage": 0,
    "id": 55,
    "name": "Pale 2-Row",
    "recipe_id": 4,
    "region": "American",
    "time": 0
  }]
  var grainOptions = [
  {
    "id": 1,
    "name": "Aromatic Malt",
    "region": "American"
  },
  {
    "id": 2,
    "name": "Ashbourne Mild",
    "region": "American"
  }]
  var hopOptions = [
  {
    "id": 142,
    "name": "Admiral",
    "region": null
  }]
  var recipeData = {
    "name": "Abrahams Amber",
    "id": 12,
    "beer_type": "Amber",
    "equipment_id": 0
  }
  it('should set default additions when none provided',
      inject([AdditionsService], (additionsService) => {
        var recipe = recipeData;
        var hops = additionsService.setDefaultAdditions(recipe, 'hops');

        expect(hops).toBeDefined();
        expect(additionsService.hops.length).toBe(1);
        expect(additionsService.hops[0].recipe_id).not.toBeDefined();
        expect(additionsService.hops[0].brew_stage).toBe(0);
        expect(additionsService.hops[0].amount).toBe(0);

        var grains = additionsService.setDefaultAdditions(recipe, 'grains');
        expect(grains).toBeDefined();
        expect(additionsService.grains.length).toBe(1);
        expect(additionsService.grains[0].recipe_id).not.toBeDefined();
        expect(additionsService.grains[0].brew_stage).toBe(0);
        expect(additionsService.grains[0].amount).toBe(0);
      }));

  it('should set hops correctly when additions are provided',
      inject([AdditionsService], (additionsService) => {
        var recipe = recipeData;
        recipe.hops = hopData;

        additionsService.setDefaultAdditions(recipe, 'hops');
        expect(additionsService.hops.length).toBe(2);
        expect(additionsService.hops[0].recipe_id).toBeDefined();
        expect(additionsService.hops[0].brew_stage).toBe(0);
        expect(additionsService.hops[0].amount).toBe(1.5);
      }));

  it('should set grains correctly when additions are provided',
      inject([AdditionsService], (additionsService) => {
        var recipe = recipeData;
        recipe.grains = grainData;

        additionsService.setDefaultAdditions(recipe, 'grains');
        expect(additionsService.grains.length).toBe(3);
        expect(additionsService.grains[0].recipe_id).toBeDefined();
        expect(additionsService.grains[0].brew_stage).toBe(0);
        expect(additionsService.grains[0].amount).toBe(2.0);
      }));
    it('should get all grains',
        inject([XHRBackend, AdditionsService], (mockBackend, additionsService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: grainOptions})));
          });

          additionsService.getGrainOptions().subscribe((data) => {
            expect(data.length).toBe(2);
            expect(data).toBe(grainOptions);
          });
        }));
    it('should get all hops',
        inject([XHRBackend, AdditionsService], (mockBackend, additionsService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: hopOptions})));
          });

          additionsService.getHopOptions().subscribe((data) => {
            expect(data.length).toBe(1);
            expect(data).toBe(hopOptions);
          });
        }));
    it('should not submit a hop if there is no addition_id',
        inject([AdditionsService, RecipeService], (additionsService, recipeService) => {
          spyOn(recipeService, 'addHopToRecipe')
          var hop = hopData[0];
          hop.addition_id = undefined;
          var hops = [hop]

          additionsService.submitRecipeAdditions(recipeData, [], hops);
          expect(recipeService.addHopToRecipe).not.toHaveBeenCalled();
        }));

    it('should not submit a grain if there is no addition_id',
        inject([AdditionsService, RecipeService], (additionsService, recipeService) => {
          spyOn(recipeService, 'addGrainToRecipe')
          var grain = grainData[0];
          grain.addition_id = undefined;
          var grains = [grain]

          additionsService.submitRecipeAdditions(recipeData, grains, []);
          expect(recipeService.addGrainToRecipe).not.toHaveBeenCalled();

        }));


});

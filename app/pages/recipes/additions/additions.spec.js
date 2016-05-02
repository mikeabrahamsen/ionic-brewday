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
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
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
    var recipeData = {
      "name": "Abrahams Amber",
      "id": 12,
      "beer_type": "Amber",
      "equipment_id": 0
    }
    it('should set default additions when none provided',
        inject([AdditionsService], (additionsService) => {
          var recipe = recipeData;
          additionsService.setDefaultAdditions(recipe, 'hops');
          expect(additionsService.hops.length).toBe(1);
          expect(additionsService.hops[0].recipe_id).not.toBeDefined();
          expect(additionsService.hops[0].brew_stage).toBe(0);
          expect(additionsService.hops[0].amount).toBe(0);

          additionsService.setDefaultAdditions(recipe, 'grains');
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
});

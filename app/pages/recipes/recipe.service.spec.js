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
import {RecipeService} from './recipe.service';


describe('RecipeService', function () {
  let injector,
      mockBackend;
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
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
    it('should get all recipes',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({body: { username: 'test_user', password: 'test2'}})));
          });

          recipeService.getAllRecipes().subscribe((data) => {
            expect(data.username).toBe('test_user');
            expect(data.password).toBe('test2');
          });
        }));
    it('should delete a recipe',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond( new ResponseOptions({status: 204}));
          });

          recipeService.deleteRecipe(2).subscribe((successResponse) => {
            expect(successResponse).toBeDefined();
            expect(successResponse.status).toBe(204);
          });
        }));
    it('should get hops for a recipe',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: hopData})));
          });

          recipeService.getHopsForRecipe(2).subscribe((data) => {
            expect(data.length).toBe(2);
            expect(data[0].addition_id).toBe(151);
            expect(data[1].addition_id).toBe(151);
            expect(data[0].id).toBe(53);
            expect(data[1].id).toBe(54);
            expect(data[0].region).toBe(null);
          });
        }));
    it('should get grains for a recipe',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: grainData})));
          });

          recipeService.getGrainsForRecipe(2).subscribe((data) => {
            expect(data.length).toBe(3);
            expect(data[0].addition_id).toBe(132);
            expect(data[1].addition_id).toBe(14);
            expect(data[0].id).toBe(51);
            expect(data[2].id).toBe(55);
            expect(data[0].region).toBe("United Kingdom");
          });
        }));
    it('should create a recipe',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: recipeData})));
          });

          recipeService.createRecipe(recipeData).subscribe((data) => {
            expect(data.name).toBe("Abrahams Amber");
          });
        }));
    it('should submit a grain',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: grainData[0]})));
          });

          recipeService.addGrainToRecipe(grainData[0]).subscribe((data) => {
            expect(data.addition_id).toBe(132);
          });
        }));
    it('should submit a hop',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: hopData[0]})));
          });

          recipeService.addHopToRecipe(hopData[0]).subscribe((data) => {
            expect(data.addition_id).toBe(151);
          });
        }));
    it('should not submit a hop if there is no addition_id',
        inject([RecipeService], (recipeService) => {
          spyOn(recipeService, 'addHopToRecipe')
          var hop = Object.assign({}, hopData[0]);
          hop.addition_id = undefined;

          recipeService.submitRecipeAdditions(recipeData, [], [hop]);
          expect(recipeService.addHopToRecipe).not.toHaveBeenCalled();
        }));

    it('should not submit a grain if there is no addition_id',
        inject([RecipeService], (recipeService) => {
          spyOn(recipeService, 'addGrainToRecipe');
          var grain = Object.assign({}, grainData[0]);
          grain.addition_id = undefined;

          recipeService.submitRecipeAdditions(recipeData, [grain], []);
          expect(recipeService.addGrainToRecipe).not.toHaveBeenCalled();

        }));
});

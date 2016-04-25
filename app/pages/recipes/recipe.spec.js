import {
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {provide, Injector} from 'angular2/core';
import {RecipeService} from './recipes';


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
    it('should get recipes',
        inject([XHRBackend, RecipeService], (mockBackend, recipeService) => {
          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({body: { username: 'test_user', password: 'test2'}})));
          });
          recipeService.getAllRecipes().subscribe((data) => {
          expect(data.username).toBe('test_user');
          expect(data.password).toBe('test2');
          });

        }));
});

import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';


import {provide, Injector} from 'angular2/core';
import {Page, NavController, Events} from 'ionic-angular';
import {Page2} from './recipes';


describe('ES6 Foo', function () {
  let injector,
      backend,
      mockBackend,
      httpService,
      service;
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
        provide(NavController, {useClass: MockBackend}),
        provide(Events, {useClass: MockBackend}),
        Page2,
      ];

    });
    it('should get blogs',
        inject([XHRBackend, Page2], (mockBackend, page2) => {

          // first we register a mock response - when a connection
          // comes in, we will respond by giving it an array of (one)
          // blog entries
          //
          //mockBackend.connections.subscribe(
          //    (connection: MockConnection) => {
          //      connection.mockRespond(new Response(
          //            new ResponseOptions({
          //              body: [
          //              {
          //                id: 26,
          //                contentRendered: "<p><b>Hi there</b></p>",
          //                contentMarkdown: "*Hi there*"
          //              }]
          //            }
          //            )));
          //    });

          // with our mock response configured, we now can
          // ask the blog service to get our blog entries
          // and then test them
          //

          mockBackend.connections.subscribe(connection => {
            connection.mockRespond(new Response(new ResponseOptions({body: { username: 'test2', password: 'test2'}})));
          });
          page2.getBlogs().subscribe((data) => {
          expect(data.username).toBe('test2');
          expect(data.password).toBe('test2');
          });

        }));
    it('should pass this', () =>{
      expect(1).toBe(1);
    });
});

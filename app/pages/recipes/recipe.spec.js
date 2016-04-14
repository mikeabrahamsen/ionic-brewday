import {Page2} from './recipes';

describe('ES6 Foo', function () {

    let foo;

    beforeEach(()=>{
        foo = new Page2();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(foo.doSomething()).toEqual('Do Something');
    });
});

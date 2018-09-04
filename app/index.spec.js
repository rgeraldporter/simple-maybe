'use strict';

var _require = require('./index'),
    Maybe = _require.Maybe,
    Nothing = _require.Nothing;

var R = require('ramda');

describe('The module', function () {

    it("should satisfy the first monad law of left identity", function () {
        var g = function g(n) {
            return Maybe.of(n + 1);
        };
        var f = function f(n) {
            return Maybe.of(n * 2);
        };

        // 1. unit(x).chain(f) ==== f(x)
        var leftIdentity1 = Maybe.of(1).chain(f);
        var leftIdentity2 = f(1);

        expect(leftIdentity1.join()).toEqual(leftIdentity2.join());
    });

    it("should satisfy the second monad law of right identity", function () {
        // 2. m.chain(unit) ==== m
        var rightIdentity1 = Maybe.of(2).chain(Maybe.of);
        var rightIdentity2 = Maybe.of(2);

        expect(rightIdentity1.join()).toEqual(rightIdentity2.join());
    });

    it("should satisfy the third monad law of associativity", function () {
        var g = function g(n) {
            return Maybe.of(n + 1);
        };
        var f = function f(n) {
            return Maybe.of(n * 2);
        };

        // 3. m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
        var associativity1 = Maybe.of(3).chain(g).chain(f);
        var associativity2 = Maybe.of(3).chain(function (x) {
            return g(x).chain(f);
        });

        expect(associativity1.join()).toEqual(associativity2.join());
    });

    it('should be return a Nothing if null or undefined is the value', function () {
        var notAThing = Maybe.of(null);
        expect(notAThing.inspect()).toBe('Nothing');
    });

    it('should return a Just with actual values', function () {
        var isSoAThing = Maybe.of('blammo');
        expect(isSoAThing.inspect()).toBe('Just(blammo)');
    });

    it('should reveal the value when using a join', function () {
        var yourGift = Maybe.of('candies').join();
        expect(yourGift).toBe('candies');
    });

    it('should reveal Nothing on a join', function () {
        var noJoin = Maybe.of(null).join();
        expect(noJoin.inspect()).toBe('Nothing');
    });

    it('should be able to map a Just', function () {
        var typicalExample = Maybe.of(1).map(function (x) {
            return x + 1;
        });
        expect(typicalExample.inspect()).toBe('Just(2)');
    });

    it('should be able to map and map again', function () {
        var moreMath = Maybe.of(1).map(function (x) {
            return x + 1;
        }).map(function (x) {
            return x + 2;
        });
        expect(moreMath.inspect()).toBe('Just(4)');
    });

    it('should be able to apply an applicative functor', function () {
        var funWithFunctor = Maybe.of(function (x) {
            return function (y) {
                return x + y + 2;
            };
        }).ap(Maybe.of(1)).ap(Maybe.of(2));
        expect(funWithFunctor.inspect()).toBe('Just(5)');
    });

    it('should handle chains', function () {
        var chainGang = Maybe.of('crows').chain(function (x) {
            return Maybe.of('a murder of ' + x);
        });
        expect(chainGang.inspect()).toBe('Just(a murder of crows)');
    });

    it('should handle nothing coming out of a chain', function () {
        var chainNothing = Maybe.of('stuff').chain(function (x) {
            return x === 'stuff' ? Maybe.of(null) : Maybe.of('something');
        });
        expect(chainNothing.inspect()).toBe('Nothing');
    });

    it('should propagate a Nothing all the way down', function () {
        var propagateNothing = Maybe.of('some thing').map(function (x) {
            return null;
        }).map(function (x) {
            return x + ' more';
        }).chain(function (x) {
            return Maybe.of(x + '.');
        });
        expect(propagateNothing.inspect()).toBe('Nothing');
    });

    it('should be able to fork', function () {
        var forkOrSpoon = Maybe.of('spoon').map(function (x) {
            return null;
        }).fork(function (_) {
            return 'forked!';
        }, function (y) {
            return y;
        });
        expect(forkOrSpoon).toBe('forked!');
    });

    it('should fork the correct direction', function () {
        var forkRight = Maybe.of('sporks').map(function (x) {
            return x + ' for all!';
        }).fork(function (_) {
            return 'there is no fork';
        }, function (y) {
            return y;
        });
        expect(forkRight).toBe('sporks for all!');
    });

    it('should be able to forkR (right)', function () {
        var forkOrSpoon = Maybe.of('spoon').forkR(function (x) {
            return 'forked right!';
        });
        expect(forkOrSpoon).toBe('forked right!');
    });

    it('should be able to forkL (left)', function () {
        var forkOrSpoon = Maybe.of('spoon').map(function (x) {
            return null;
        }).forkL(function (_) {
            return 'forked!';
        });
        expect(forkOrSpoon).toBe('forked!');
    });

    it('should be able to forkL (left) and return nothing if it goes right', function () {
        var forkOrSpoon = Maybe.of('spoon').forkL(function (x) {
            return 'forked right!';
        });
        expect(forkOrSpoon).not.toBe('forked right!');
    });

    it('should be able to forkR (right) and return nothing if it goes left', function () {
        var forkOrSpoon = Maybe.of('spoon').map(function (x) {
            return null;
        }).forkR(function (_) {
            return 'forked!';
        });
        expect(forkOrSpoon).not.toBe('forked!');
    });

    it('should be able to squence', function () {
        var seqTest = R.sequence(Maybe.of, Maybe.of(['stuffs', 'things']));
        expect(seqTest[0].inspect()).toBe('Just(stuffs)');
        expect(seqTest[1].inspect()).toBe('Just(things)');
        var seqTest2 = R.sequence(Maybe.of, seqTest);
        expect(seqTest2.inspect()).toBe('Just(stuffs,things)');
        var seqTest3 = R.sequence(Maybe.of, [Maybe.of(1), Maybe.of(null)]);
        expect(seqTest3.inspect()).toBe('Nothing');
    });

    it('should be able to traverse', function () {
        var safeDiv = function safeDiv(n) {
            return function (d) {
                return d === 0 ? Maybe.of(null) : Maybe.of(n / d);
            };
        };
        var travTest = R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]);
        expect(travTest.inspect()).toBe('Just(5,2.5,2)');
        var travTest2 = R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]);
        expect(travTest2.inspect()).toBe('Nothing');
    });

    it('should be able to accept Nothing as a parameter and retain it as a Nothing and not a Just', function () {
        var nada = Nothing();
        var nadaMaybe = Maybe.of(nada);
        expect(nadaMaybe.inspect()).toBe('Nothing');
    });
});
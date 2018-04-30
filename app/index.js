"use strict";

var Just = function Just(x) {
    return {
        isJust: true,
        isNothing: false,
        inspect: function inspect(_) {
            return "Just(" + x + ")";
        },
        map: function map(f) {
            return Maybe.of(f(x));
        },
        ap: function ap(y) {
            return y.map(x);
        },
        chain: function chain(f) {
            return f(x);
        },
        join: function join(_) {
            return x;
        },
        fork: function fork(_, g) {
            return g(x);
        },
        sequence: function sequence(of) {
            return x.map(Maybe.of);
        }
    };
};

var Nothing = function Nothing(_) {
    return {
        isJust: false,
        isNothing: true,
        inspect: function inspect(_) {
            return "Nothing";
        },
        map: function map(_) {
            return Nothing();
        },
        ap: function ap(_) {
            return Nothing();
        },
        chain: function chain(_) {
            return Nothing();
        },
        join: function join(_) {
            return Nothing();
        },
        fork: function fork(f, _) {
            return f();
        },
        sequence: function sequence(of) {
            return of(Nothing());
        }
    };
};

var Maybe = {
    of: function of(x) {
        return x === null || x === undefined ? Nothing() : Just(x);
    }
};

module.exports = { Maybe: Maybe };
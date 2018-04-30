(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Maybe = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

module.exports = { Maybe: Maybe, Nothing: Nothing, Just: Just };

},{}]},{},[1])(1)
});

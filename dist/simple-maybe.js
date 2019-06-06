(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MaybeModule = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $$JustSymbol = Symbol();
var $$NothingSymbol = Symbol();

var Just = function Just(x) {
    var _ref;

    return _ref = {
        inspect: function inspect() {
            return "Just(" + x + ")";
        },
        map: function map(f) {
            return Maybe.of(f(x));
        },
        fmap: function fmap(f) {
            return Maybe.of(f(x));
        },
        ap: function ap(y) {
            return y.map(x);
        },
        chain: function chain(f) {
            return f(x);
        },
        bind: function bind(f) {
            return f(x);
        },
        flatMap: function flatMap(f) {
            return f(x);
        },
        join: function join() {
            return x;
        },
        emit: function emit() {
            return x;
        },
        fork: function fork(_, g) {
            return g(x);
        },
        forkL: function forkL(_) {
            return Nothing();
        },
        forkR: function forkR(f) {
            return f(x);
        },
        sequence: function sequence(of) {
            return x.map(Maybe.of);
        }
    }, _defineProperty(_ref, $$JustSymbol, true), _defineProperty(_ref, $$NothingSymbol, false), _ref;
};

var Nothing = function Nothing(_) {
    var _ref2;

    return _ref2 = {
        inspect: function inspect() {
            return "Nothing";
        },
        map: function map(_) {
            return Nothing();
        },
        fmap: function fmap(_) {
            return Nothing();
        },
        ap: function ap(_) {
            return Nothing();
        },
        chain: function chain(_) {
            return Nothing();
        },
        bind: function bind(_) {
            return Nothing();
        },
        flatMap: function flatMap(_) {
            return Nothing();
        },
        join: function join() {
            return Nothing();
        },
        emit: function emit() {
            return Nothing();
        },
        fork: function fork(f, _) {
            return f();
        },
        forkL: function forkL(f) {
            return f();
        },
        forkR: function forkR(_) {
            return Nothing();
        },
        sequence: function sequence(of) {
            return of(Nothing());
        }
    }, _defineProperty(_ref2, $$JustSymbol, false), _defineProperty(_ref2, $$NothingSymbol, true), _ref2;
};

var Maybe = {
    of: function of(x) {
        return x === null || x === undefined || x[$$NothingSymbol] ? Nothing() : Just(x);
    }
};

module.exports = { Maybe: Maybe, Nothing: Nothing, Just: Just };

},{}]},{},[1])(1)
});

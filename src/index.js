const $$JustSymbol = Symbol();
const $$NothingSymbol = Symbol();

const Just = x => ({
    isJust: true,
    isNothing: false,
    inspect: _ => `Just(${x})`,
    map: f => Maybe.of(f(x)),
    ap: y => y.map(x),
    chain: f => f(x),
    join: _ => x,
    fork: (_, g) => g(x),
    sequence: of => x.map(Maybe.of),
    [$$JustSymbol]: true,
    [$$NothingSymbol]: false
});

const Nothing = _ => ({
    inspect: _ => `Nothing`,
    map: _ => Nothing(),
    ap: _ => Nothing(),
    chain: _ => Nothing(),
    join: _ => Nothing(),
    fork: (f, _) => f(),
    sequence: of => of(Nothing()),
    [$$JustSymbol]: false,
    [$$NothingSymbol]: true
});

const Maybe = {
    of: x => x === null || x === undefined || x[$$NothingSymbol] ? Nothing() : Just(x)
};

module.exports = {Maybe, Nothing, Just};
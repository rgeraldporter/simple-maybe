const $$JustSymbol = Symbol();
const $$NothingSymbol = Symbol();

const Just = x => ({
    inspect: () => `Just(${x})`,
    map: f => Maybe.of(f(x)),
    fmap: f => Maybe.of(f(x)),
    ap: y => y.map(x),
    chain: f => f(x),
    bind: f => f(x),
    flatMap: f => f(x),
    join: () => x,
    emit: () => x,
    fork: (_, g) => g(x),
    forkL: _ => Nothing(),
    forkR: f => f(x),
    sequence: of => x.map(Maybe.of),
    [$$JustSymbol]: true,
    [$$NothingSymbol]: false
});

const Nothing = _ => ({
    inspect: () => `Nothing`,
    map: _ => Nothing(),
    fmap: _ => Nothing(),
    ap: _ => Nothing(),
    chain: _ => Nothing(),
    bind: _ => Nothing(),
    flatMap: _ => Nothing(),
    join: () => Nothing(),
    emit: () => Nothing(),
    fork: (f, _) => f(),
    forkL: f => f(),
    forkR: _ => Nothing(),
    sequence: of => of(Nothing()),
    [$$JustSymbol]: false,
    [$$NothingSymbol]: true
});

const Maybe = {
    of: x =>
        x === null || x === undefined || x[$$NothingSymbol]
            ? Nothing()
            : Just(x)
};

module.exports = { Maybe, Nothing, Just };

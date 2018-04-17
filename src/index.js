const Just = x => ({
    isJust: true,
    isNothing: false,
    inspect: _ => `Just(${x})`,
    map: f => Maybe.of(f(x)),
    ap: y => y.map(x),
    chain: f => f(x),
    join: _ => x,
    fork: (_, g) => g(x)
});

const Nothing = _ => ({
    isJust: false,
    isNothing: true,
    inspect: _ => `Nothing`,
    map: _ => Nothing(),
    ap: _ => Nothing(),
    chain: _ => Nothing(),
    join: _ => Nothing(),
    fork: (f, _) => f()
});

const Maybe = {
    of: x => x === null || x === undefined ? Nothing() : Just(x)
};

module.exports = {Maybe};
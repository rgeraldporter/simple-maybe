const {Maybe} = require('./index');
const R = require('ramda');

describe('The module', () => {

    it("should satisfy the first monad law of left identity", () => {
        const g = (n) => Maybe.of(n + 1);
        const f = (n) => Maybe.of(n * 2);

        // 1. unit(x).chain(f) ==== f(x)
        const leftIdentity1 = Maybe.of(1).chain(f);
        const leftIdentity2 = f(1);

        expect(leftIdentity1.join()).toEqual(leftIdentity2.join());
    });

    it("should satisfy the second monad law of right identity", () => {
        // 2. m.chain(unit) ==== m
        const rightIdentity1 = Maybe.of(2).chain(Maybe.of);
        const rightIdentity2 = Maybe.of(2);

        expect(rightIdentity1.join()).toEqual(rightIdentity2.join());
    });

    it("should satisfy the third monad law of associativity", () => {
        const g = n => Maybe.of(n + 1);
        const f = n => Maybe.of(n * 2);

        // 3. m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
        const associativity1 = Maybe.of(3)
            .chain(g)
            .chain(f);
        const associativity2 = Maybe.of(3).chain(x => g(x).chain(f));

        expect(associativity1.join()).toEqual(associativity2.join());
    });


    it('should be return a Nothing if null or undefined is the value', () => {
        const notAThing = Maybe.of(null);
        expect(notAThing.inspect()).toBe('Nothing');
    });

    it('should return a Just with actual values', () => {
        const isSoAThing = Maybe.of('blammo');
        expect(isSoAThing.inspect()).toBe(`Just(blammo)`);
    });

    it('should reveal the value when using a join', () => {
        const yourGift = Maybe.of('candies').join();
        expect(yourGift).toBe('candies');
    });

    it('should reveal Nothing on a join', () => {
        const noJoin = Maybe.of(null).join();
        expect(noJoin.inspect()).toBe('Nothing');
    })

    it('should be able to map a Just', () => {
        const typicalExample = Maybe.of(1).map(x => x + 1);
        expect(typicalExample.inspect()).toBe('Just(2)');
    });

    it('should be able to map and map again', () => {
        const moreMath = Maybe.of(1).map(x => x + 1).map(x => x + 2);
        expect(moreMath.inspect()).toBe('Just(4)');
    });

    it('should be able to apply an applicative functor', () => {
        const funWithFunctor = Maybe.of(x => y => x + y + 2).ap(Maybe.of(1)).ap(Maybe.of(2));
        expect(funWithFunctor.inspect()).toBe('Just(5)');
    });

    it('should handle chains', () => {
        const chainGang = Maybe.of('crows').chain(x => Maybe.of('a murder of ' + x));
        expect(chainGang.inspect()).toBe('Just(a murder of crows)');
    });

    it('should handle nothing coming out of a chain', () => {
        const chainNothing = Maybe.of('stuff').chain(x => x === 'stuff' ? Maybe.of(null) : Maybe.of('something'));
        expect(chainNothing.inspect()).toBe('Nothing');
    });

    it('should propagate a Nothing all the way down', () => {
        const propagateNothing = Maybe.of('some thing').map(x => null).map(x => x + ' more').chain(x => Maybe.of(x + '.'));
        expect(propagateNothing.inspect()).toBe('Nothing');
    });

    it('should be able to fork', () => {
        const forkOrSpoon = Maybe.of('spoon').map(x => null).fork(_ => 'forked!', y => y);
        expect(forkOrSpoon).toBe('forked!');
    });

    it('should fork the correct direction', () => {
        const forkRight = Maybe.of('sporks').map(x => x + ' for all!').fork(_ => 'there is no fork', y => y);
        expect(forkRight).toBe('sporks for all!');
    });

    it('should be able to squence', () => {
        const seqTest = R.sequence(Maybe.of, Maybe.of(['stuffs', 'things']));
        expect(seqTest[0].inspect()).toBe('Just(stuffs)');
        expect(seqTest[1].inspect()).toBe('Just(things)');
        const seqTest2 = R.sequence(Maybe.of, seqTest);
        expect(seqTest2.inspect()).toBe('Just(stuffs,things)');
        const seqTest3 = R.sequence(Maybe.of, [Maybe.of(1), Maybe.of(null)]);
        expect(seqTest3.inspect()).toBe('Nothing');
    });

    it('should be able to traverse', () => {
        const safeDiv = n => d => d === 0 ? Maybe.of(null) : Maybe.of(n / d)
        const travTest = R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]);
        expect(travTest.inspect()).toBe('Just(5,2.5,2)');
        const travTest2 = R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]);
        expect(travTest2.inspect()).toBe('Nothing');
    });
});
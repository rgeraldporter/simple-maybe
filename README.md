# Simple Maybe Monad

[![Build Status](https://travis-ci.org/rgeraldporter/simple-maybe.svg?branch=master)](https://travis-ci.org/rgeraldporter/simple-maybe)

`simple-maybe` is a simple, lightweight `Maybe` monad module.

It is written in the `Either`-style pattern of a with `Just` and `Nothing` as the left/right identities.

This library plays very well with [Ramda](https://ramdajs.com/).

## What is a "Maybe"?

The term `Maybe` comes from functional programming. The concept is simple: _maybe_ there is a value, _maybe_ there is not. Using this concept helps handle problems that can arise from allowing a value in Javascript to become `null` or `undefined`.

`Maybe` puts a value into a safe container that isolates the value away from being able to cause side-effects.

## API

The API follows pattern that is common in functional Javascript programming:

```
const container = Maybe.of(value);
```

Because `value` is a complete unknown, which may even be `undefined` even, we now interact with the value using its container.

## Taking a peek at a value

At any time, you can emit a value though. Either through the console, or in the code itself:

```
>> container.inspect();

"Just(1)"
```

This indicates the value is `1`. But what if it was `null`?

```
>> container.inspect();

"Nothing"
```

In short, within the container, there is either a `Just` value, or `Nothing` value. Both can have all the same methods applies to them, the difference being that `Nothing` will always return `Nothing` and `Just` will execute as normal.

## Mapping functions

Running functions against the value is easy using `.map(f)`.

As an example, let's try to add `1` to the value:

```
const newContainer = container.map(value => value + 1);
```

This returns to you a new value. (Assuming you had a string or number here -- other types would crash, but fixing that requires a [type system](https://flow.org/en/)!)

## Unwrapping a value

In code, you can get the value through a `.emit()` (alias: `.join()`):

```js
const container = Maybe.of(1);

const value = container.emit(); // value === 1
```

If you're looking to avoid ever assigning `null` or `undefined`, there are better ways to get your value out.

Consider `.fork(f, g)`:

```js
const result = container.fork(
    x => {
        // we got a Nothing, so lets handle our invalid case:
        return 'There was no value';
    },
    y => {
        // we got Just(y), lets return the value
        return 'We got a value: ' + y;
    }
);
```

In `.fork(f, g)`, you pass in two functions: `f`, the first to handle the `Nothing` case; `g`, the other to handle the `Just` (actual value) case.

### `forkL` and `forkR`

For the sake of brevity, you may also use `.forkL(f)` (left) or `.forkR(f)` (right) to run a function `f` against only one case. This is useful when you only want to handle one condition and do not need to do anything with the other.

```js
const result = container.forkL(
    x => {
        // we got a Nothing, so lets handle our invalid case:
        return "There was no value";
    });
);

const result2 = container.forkR(
    y => {
        // we got Just(y), lets return the value
        return 'We got a value: ' + y;
    });
);
```

## Bringing things together

You may chain all these together, much like you may see in `Promise`s.

```js
const result = Maybe.of(value)
    .map(val => val + 1)
    .fork(x => 'there was no value', y => `the value was: ${y}`);

// if value = 1, result = "the value was: 2"
// if value = null, result = "there was no value" (JS did not try to add null + 1)
// if value = "string", result = "the value was: string1"
```

## Roadmap

No changes planned, outside of documentation. Small functional programming libraries don't tend to change much. But they do tend to lack good, readable documentation.

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Robert Gerald Porter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

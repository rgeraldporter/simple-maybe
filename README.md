# Maybe Monad
### v0.1.0
[![Build Status](https://travis-ci.org/rgeraldporter/maybe-monad.svg?branch=master)](https://travis-ci.org/rgeraldporter/maybe-monad)

`maybe-monad` is a simple, lightweight `Maybe` monad module.

It is written in the `Either`-style pattern of a with `Just` and `Nothing` as the left/right identities.

*Note*: this repo is quite new, and so long as I keep `0.x` as the version, it is still considered unstable. It won't be in `0.x` for long, though!

This library plays very well with Ramda.

## It's a what?

Some backgroun in functional programming is helpful in understanding, but in short you would use this module when you are trying to take control of mutations, side-effects, and banish `null` issues from your code.

## How to use

Only one thing is exposed by the module currently: `Maybe`.

```
const {Maybe} = require('maybe-monad');

const result = Maybe.of(someFn())
                .map(someOtherFn)
                .fork(err => handleAnError(err), value => doSomethingWithFinalResult(value));
```

## Example

Forthcoming!

## Roadmap

Not sure yet. This may not need much updating as functional programming doesn't change much!

## License

The MIT License (MIT)

Copyright (c) 2018 Robert Gerald Porter

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

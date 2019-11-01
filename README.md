# timeout-idle-promise

[![Travis build status](http://img.shields.io/travis/gajus/timeout-idle-promise/master.svg?style=flat-square)](https://travis-ci.org/gajus/timeout-idle-promise)
[![Coveralls](https://img.shields.io/coveralls/gajus/timeout-idle-promise.svg?style=flat-square)](https://coveralls.io/github/gajus/timeout-idle-promise)
[![NPM version](http://img.shields.io/npm/v/timeout-idle-promise.svg?style=flat-square)](https://www.npmjs.org/package/timeout-idle-promise)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

Detects when a promise is idle (does not create asynchronous events) for longer than permitted amount of time.

## API

```js
import {
  timeoutIdlePromise,
  TimeoutError,
} from 'timeout-idle-promise';

/**
 * @param {Function} promiseFactory
 * @param {number} maximumIdleTime Idle timeout in milliseconds.
 * @throws TimeoutError
 */
timeoutIdlePromise(promiseFactory);

```

## Example Usage

```js
// Rejected with Idle promise timeout.
timeoutIdlePromise(() => {
  return new Promise((resolve) => {

  });
}, 1000);

// Resolved.
timeoutIdlePromise(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        setTimeout(() => {
          resolve();
        }, 500);
      }, 500);
    }, 500);
  });
}, 1000);

```

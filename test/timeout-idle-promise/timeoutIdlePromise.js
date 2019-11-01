// @flow

import test from 'ava';
import {
  TimeoutError,
  timeoutIdlePromise,
} from '../../src';

test('resolves already resolved promise', async (t) => {
  const result = await timeoutIdlePromise(() => {
    return Promise.resolve('foo');
  }, 1000);

  t.is(result, 'foo');
});

test('resolves a promise that resolves within a timeout', async (t) => {
  const result = await timeoutIdlePromise(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo');
      }, 100);
    });
  }, 1000);

  t.is(result, 'foo');
});

test('resolves a promise that resolves within a timeout (over multiple event loops)', async (t) => {
  const result = await timeoutIdlePromise(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTimeout(() => {
          setTimeout(() => {
            resolve('foo');
          }, 500);
        }, 500);
      }, 500);
    });
  }, 1000);

  t.is(result, 'foo');
});

test('rejects a promise that does not resolve within a timeout', async (t) => {
  const error = await t.throwsAsync(timeoutIdlePromise(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo');
      }, 1000);
    });
  }, 500));

  t.true(error instanceof TimeoutError);
});

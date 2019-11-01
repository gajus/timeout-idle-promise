// @flow

// $FlowFixMe
import asyncHooks from 'async_hooks';
import {
  TimeoutError,
} from '../errors';

// eslint-disable-next-line flowtype/no-weak-types
export default async (promiseFactory: () => Promise<any>, maximumIdleTime: number) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const parentAsyncIds = [];

    const asyncHook = asyncHooks.createHook({
      init: (asyncId, type, triggerAsyncId) => {
        if (parentAsyncIds.includes(triggerAsyncId)) {
          // eslint-disable-next-line no-use-before-define
          if (Timeout) {
            // eslint-disable-next-line no-use-before-define
            Timeout.refresh();
          }

          if (!parentAsyncIds.includes(asyncId)) {
            parentAsyncIds.push(asyncId);
          }
        }
      },
    });

    // eslint-disable-next-line flowtype/no-weak-types
    const Timeout: Object = setTimeout(() => {
      reject(new TimeoutError('Idle promise timeout.'));

      asyncHook.disable();
    }, maximumIdleTime);

    asyncHook.enable();

    // Force new async execution context.
    await null;

    const executionAsyncId = asyncHooks.executionAsyncId();

    parentAsyncIds.push(executionAsyncId);

    try {
      const result = await promiseFactory();

      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      asyncHook.disable();
    }
  });
};

// @flow

/* eslint-disable fp/no-class */

import ExtendableError from 'es6-error';

export class TimeoutIdlePromiseError extends ExtendableError {
  code: string;
}

export class TimeoutError extends TimeoutIdlePromiseError {
  code = 'TIMEOUT_ERROR';
}

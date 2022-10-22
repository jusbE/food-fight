import { AxiosRequestConfig } from 'axios'
import * as rax from 'retry-axios'
rax.attach()

const defaultRetryConfiguration: AxiosRequestConfig['raxConfig'] = {
  // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
  retry: 3,

  // Retry 3 times on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
  noResponseRetries: 3,

  // Milliseconds to delay at first.  Defaults to 100.
  retryDelay: 100,

  // HTTP methods to automatically retry.  Defaults to:
  // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
  httpMethodsToRetry: ['GET', 'POST', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],

  // The response status codes to retry.  Supports a double
  // array with a list of ranges.  Defaults to:
  // [[100, 199], [429, 429], [500, 599]]
  statusCodesToRetry: [
    [100, 199],
    [429, 429],
    [500, 599],
  ],

  // You can set the backoff type.
  // options are 'exponential' (default), 'static' or 'linear'
  backoffType: 'exponential',

  // You can detect when a retry is happening, and figure out how many
  // retry attempts have been made
  onRetryAttempt: (err): void => {
    // eslint-disable-next-line no-console
    console.log(`Retrying request due to an error: ${err}`)
  },
}

export { defaultRetryConfiguration }

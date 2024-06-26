/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type LEVELS = 'log' | 'warn' | 'error';
type ProviderCallback = (message: string | Error) => void;

let providerWarning: LEVELS | ProviderCallback | undefined = undefined;

export const setEuiDevProviderWarning = (warningType: typeof providerWarning) =>
  (providerWarning = warningType);

export const getEuiDevProviderWarning = () => providerWarning;

// Not a public top-level EUI export, currently for internal use
export const emitEuiProviderWarning = (providerMessage: string) => {
  // Handle callback types
  if (typeof providerWarning === 'function') {
    return providerWarning(providerMessage);
  }
  // Handle level types
  switch (providerWarning) {
    case 'log':
      console.log(providerMessage);
      break;
    case 'warn':
      console.warn(providerMessage);
      break;
    case 'error':
      throw new Error(providerMessage);
    case undefined:
    default:
      break;
  }
};

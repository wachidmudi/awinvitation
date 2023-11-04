/**
 * @see https://github.com/EricLambrecht/react-timing-hooks/blob/main/src/idle-callback/useIdleCallbackEffect.ts
 * Example usage
 * @see https://ericlambrecht.github.io/react-timing-hooks/idle-callback-api/useIdleCallbackEffect.html
 */
import { DependencyList, useCallback, useEffect, useRef } from 'react';
import {
  IdleCallbackEffectCallback,
  RequestIdleCallbackDeadline,
  RequestIdleCallbackHandle,
  RequestIdleCallbackOptions,
} from './types';

/**
 * Shim the default implementation
 * @see https://developer.chrome.com/blog/using-requestidlecallback/#checking-for-requestidlecallback
 */
function applyFallback() {
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id);
    };
}

/**
 * Behaves like a regular use effect except that its callback receives a function-argument that allows
 * to run callbacks via `window.requestIdleCallback` inside the effect. Pending idle callbacks will be cleared on unmount.
 * @param effect
 * @param deps
 */
export const useIdleCallbackEffect = (
  effect: IdleCallbackEffectCallback,
  deps: DependencyList
) => {
  if (typeof window !== 'undefined' && !window.requestIdleCallback) {
    console.warn('This browser does not support "requestIdleCallback"');
    applyFallback();
  }

  const idleCallbackHandle = useRef<RequestIdleCallbackHandle | null>(null);
  const idleCallbackFunc = useCallback(
    (
      callback: (deadline: RequestIdleCallbackDeadline) => unknown,
      options?: RequestIdleCallbackOptions
    ) => {
      idleCallbackHandle.current = window.requestIdleCallback(
        callback,
        options
      );
      return idleCallbackHandle.current;
    },
    [idleCallbackHandle]
  );

  useEffect(() => {
    return effect(idleCallbackFunc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    return function onUnmount() {
      if (idleCallbackHandle.current !== null) {
        window.cancelIdleCallback(idleCallbackHandle.current!);
      }
    };
  }, [idleCallbackHandle]);
};

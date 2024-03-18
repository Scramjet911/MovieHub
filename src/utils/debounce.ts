type AnyFunction = (...args: any[]) => any;

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

const debounce = <F extends AnyFunction>(
  func: F,
  wait: number,
  options: DebounceOptions = {},
) => {
  let timeout: NodeJS.Timeout | null;
  let lastArgs: Parameters<F> | null;
  let lastThis: any;
  let result: ReturnType<F> | undefined;

  const { leading = false, trailing = true } = options;

  const invokeFunction = () => {
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = null;
    }
  };

  // eslint-disable-next-line func-names
  const debounced = function (this: any, ...args: Parameters<F>) {
    lastArgs = args;
    lastThis = this;

    if (!timeout && leading) {
      invokeFunction();
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      if (trailing) {
        invokeFunction();
      }
    }, wait);

    if (leading && !timeout) {
      result = func.apply(lastThis, lastArgs!);
      lastArgs = null;
      lastThis = null;
    }

    return result;
  };

  debounced.cancel = () => {
    clearTimeout(timeout!);
    timeout = null;
    lastArgs = null;
    lastThis = null;
  };

  return debounced;
};

export default debounce;

/* eslint-disable no-console */

const storeLogger = (store: any) => (next: any) => (action: any) => {
  console.warn('dispatching', action);
  const result = next(action);
  console.warn('next state', store.getState());
  return result;
};

export default storeLogger;

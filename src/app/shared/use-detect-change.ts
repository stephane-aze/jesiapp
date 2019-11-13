import { SimpleChange } from '@angular/core';

export default (change: SimpleChange): boolean => {
  if (!change) {
    return false;
  }

  if (change.isFirstChange()) {
    return false;
  }

  const { currentValue, previousValue } = change;
  return currentValue !== previousValue;
};

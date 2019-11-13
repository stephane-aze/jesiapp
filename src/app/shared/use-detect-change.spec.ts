import cases from 'jest-in-case';
import { SimpleChange } from '@angular/core';
import useDetectChange from './use-detect-change';

cases(
  'useDetectChange',
  ({ given, when, then }) => {
    const change = new SimpleChange(given.initialValue, when.newValue, when.isFirstChange);
    expect(useDetectChange(change)).toBe(then.hasChanged);
  },
  {
    default: {
      given: { initialValue: undefined },
      when: { newValue: undefined, isFirstChange: false },
      then: { hasChanged: false },
    },
    'when is first change then should be false': {
      given: { initialValue: undefined },
      when: { newValue: 'foo', isFirstChange: true },
      then: { hasChanged: false },
    },
    'when is not first change then should be true': {
      given: { initialValue: 'foo' },
      when: { newValue: 'bar', isFirstChange: false },
      then: { hasChanged: true },
    },
    'when is not first change but did not change value then should be false': {
      given: { initialValue: 'bar' },
      when: { newValue: 'bar', isFirstChange: false },
      then: { hasChanged: false },
    },
  },
);

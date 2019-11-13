import { SimpleChange } from '@angular/core';
import cases from 'jest-in-case';

import useComponentTestSetup from '../../test-setup/use-component-test-setup';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  const testConfig = useComponentTestSetup<ButtonComponent>(ButtonComponent);

  beforeEach(testConfig.init);

  it('should create', () => {
    expect(testConfig.component).toBeTruthy();
  });

  test('default values', () => {
    expect(testConfig.component.classname).toBe('bg-gray');
    expect(testConfig.component.isDisabled).toBe(null);
    expect(testConfig.component.type).toBe('button');
    expect(testConfig.element.querySelector('button').className).toBe('bg-gray');
    expect(testConfig.element.querySelector('button').disabled).toBe(false);
    expect(testConfig.element.querySelector('button').type).toBe('button');
  });

  cases(
    'handleClassesChanges',
    ({ given, when, then }) => {
      testConfig.component.ngOnChanges({
        primary: new SimpleChange(given.primary, when.primary, false),
        secondary: new SimpleChange(given.secondary, when.secondary, false),
      });
      testConfig.fixture.detectChanges();

      expect(testConfig.component.classname).toBe(then.classname);
      expect(testConfig.element.querySelector('button').className).toBe(then.classname);
    },
    {
      default: {
        given: { primary: undefined, secondary: undefined },
        when: { primary: undefined, secondary: undefined },
        then: { classname: 'bg-gray' },
      },
      'when primary alone then should have primary class': {
        given: { primary: undefined, secondary: undefined },
        when: { primary: true, secondary: undefined },
        then: { classname: 'bg-primary' },
      },
      'when primary and secondary then shoyld have primary class': {
        given: { primary: undefined, secondary: undefined },
        when: { primary: true, secondary: true },
        then: { classname: 'bg-primary' },
      },
      'when secondary alone then should have secondary class': {
        given: { primary: undefined, secondary: undefined },
        when: { primary: undefined, secondary: true },
        then: { classname: 'bg-secondary' },
      },
    },
  );

  cases(
    'handleDisabledChanges',
    ({ given, when, then }) => {
      testConfig.component.ngOnChanges({
        disabled: new SimpleChange(given.disabled, when.disabled, false),
      });
      testConfig.fixture.detectChanges();

      expect(testConfig.component.isDisabled).toBe(then.isDisabled);
      expect(testConfig.element.querySelector('button').disabled).toBe(then.disabledProp);
    },
    {
      default: {
        given: { disabled: undefined },
        when: { disabled: undefined },
        then: { isDisabled: null, disabledProp: false },
      },
      'when true should set disable to true': {
        given: { disabled: undefined },
        when: { disabled: true },
        then: { isDisabled: true, disabledProp: true },
      },
      'when false should set disable to false': {
        given: { disabled: undefined },
        when: { disabled: false },
        then: { isDisabled: null, disabledProp: false },
      },
    },
  );
});

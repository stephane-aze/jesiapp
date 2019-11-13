import { SimpleChange } from '@angular/core';
import cases from 'jest-in-case';

import { LoaderComponent } from './loader.component';
import useComponentTestSetup from '../../test-setup/use-component-test-setup';

describe('LoaderComponent', () => {
  const testConfig = useComponentTestSetup<LoaderComponent>(LoaderComponent);

  beforeEach(testConfig.init);

  it('should create', () => {
    expect(testConfig.component).toBeTruthy();
  });

  test('default values', () => {
    expect(testConfig.component.isCentered).toBe(false);
    expect(testConfig.element.querySelector('span').className).toBe('');
  });

  test('center input value', () => {
    testConfig.setup(() => {
      testConfig.component.center = '';
    });

    expect(testConfig.component.isCentered).toBe(true);
    expect(testConfig.element.querySelector('span').className).toBe('centered');
  });

  cases(
    'handleClassesChanges',
    ({ given, when, then }) => {
      testConfig.component.ngOnChanges({
        center: new SimpleChange(given.center, when.center, false),
      });
      testConfig.fixture.detectChanges();

      expect(testConfig.component.isCentered).toBe(then.isCentered);
      expect(testConfig.element.querySelector('span').className).toBe(then.classname);
    },
    {
      default: {
        given: { center: undefined },
        when: { center: undefined },
        then: { isCentered: false, classname: '' },
      },
      'when center is set': {
        given: { center: undefined },
        when: { center: '' },
        then: { isCentered: true, classname: 'centered' },
      },
      'when center is true': {
        given: { center: '' },
        when: { center: true },
        then: { isCentered: true, classname: 'centered' },
      },
      'when center is false': {
        given: { center: true },
        when: { center: false },
        then: { isCentered: false, classname: '' },
      },
    },
  );
});

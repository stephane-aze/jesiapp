import { TestBed, async, TestModuleMetadata } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentTestEnv } from './ComponentTestEnv';
import selectByTestid from './select-by-testid';

export default <T = any>(componentClass: any, moduleConfig: TestModuleMetadata = {}) => {
  const config: ComponentTestEnv<T> = {
    fixture: null,
    component: null,
    element: null,
    debug: null,
    setup: null,
    init: null,
    getChild: null,
    getElementByTestId: null,
    getDebugByTestId: null,
  };

  config.init = (done: any, setValues = () => {}) =>
    async(() => {
      TestBed.configureTestingModule({
        declarations: [componentClass],
        ...moduleConfig,
      }).compileComponents();

      config.setup(setValues);
    })(done);

  config.setup = (setValues = () => {}) => {
    config.fixture = TestBed.createComponent<T>(componentClass);
    config.component = config.fixture.componentInstance;
    config.element = config.fixture.nativeElement;
    config.debug = config.fixture.debugElement;

    setValues();
    config.fixture.detectChanges();
  };

  config.getChild = directive => config.debug.query(By.directive(directive));
  config.getElementByTestId = testId => config.element.querySelector(selectByTestid(testId));
  config.getDebugByTestId = testId => config.debug.query(By.css(selectByTestid(testId)));

  return config;
};

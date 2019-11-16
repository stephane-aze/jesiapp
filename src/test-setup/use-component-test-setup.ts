import { TestBed, ComponentFixture, async, TestModuleMetadata } from '@angular/core/testing';

export default <T = any>(componentClass: any, moduleConfig: TestModuleMetadata = {}) => {
  const config: {
    fixture: ComponentFixture<T>;
    component: T;
    element: HTMLElement;
    setup: (setValues?: () => void) => void;
    init: (done: any, setValues?: () => void) => typeof async;
  } = {
    fixture: null,
    component: null,
    element: null,
    setup: null,
    init: null,
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

    setValues();
    config.fixture.detectChanges();
  };

  return config;
};

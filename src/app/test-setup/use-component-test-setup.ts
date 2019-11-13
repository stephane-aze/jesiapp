import { TestBed, ComponentFixture, async, TestModuleMetadata } from '@angular/core/testing';

export default <T>(componentClass: any, moduleConfig: TestModuleMetadata = {}) => {
  const config: {
    fixture: ComponentFixture<T>;
    component: T;
    element: HTMLElement;
    setup: (setValues?: () => void) => void;
    init: typeof async;
  } = {
    fixture: null,
    component: null,
    element: null,
    setup: null,
    init: null,
  };

  config.init = async(() => {
    TestBed.configureTestingModule({
      declarations: [componentClass],
      ...moduleConfig,
    }).compileComponents();

    config.setup();
  });

  config.setup = (setValues = () => {}) => {
    config.fixture = TestBed.createComponent<T>(componentClass);
    config.component = config.fixture.componentInstance;
    config.element = config.fixture.nativeElement;

    setValues();
    config.fixture.detectChanges();
  };

  return config;
};

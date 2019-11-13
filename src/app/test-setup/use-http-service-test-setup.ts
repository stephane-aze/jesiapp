import { TestBed, async, TestModuleMetadata } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

export default <T>(serviceClass: any, moduleConfig: TestModuleMetadata = {}) => {
  const config: {
    service: T;
    httpTestingController: HttpTestingController;
    setup: () => void;
    init: typeof async;
    teardown: () => void;
  } = {
    service: null,
    httpTestingController: null,
    setup: null,
    init: null,
    teardown: null,
  };

  config.init = async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [serviceClass],
      ...moduleConfig,
    });
    config.setup();
  });

  config.setup = () => {
    config.service = TestBed.get(serviceClass);
    config.httpTestingController = TestBed.get(HttpTestingController);
  };

  config.teardown = () => {
    config.httpTestingController.verify();
  };

  return config;
};

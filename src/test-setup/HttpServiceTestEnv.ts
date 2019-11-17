import { async } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

export interface HttpServiceTestEnv<T> {
  service: T;
  httpTestingController: HttpTestingController;
  setup: () => void;
  init: typeof async;
  teardown: () => void;
}

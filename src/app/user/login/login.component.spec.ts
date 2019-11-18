import { RouterTestingModule } from '@angular/router/testing';

import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import { ComponentTestEnv } from 'src/test-setup/ComponentTestEnv';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginComponent', () => {
  let testEnv: ComponentTestEnv<LoginComponent>;

  beforeAll(() => {
    testEnv = useComponentTestSetup(LoginComponent, {
      imports: [SharedModule, RouterTestingModule],
    });
  });

  afterAll(() => {
    testEnv = null;
  });

  beforeEach(done => testEnv.init(done));

  it('should create', () => {
    expect(testEnv.component).toBeTruthy();
  });
});

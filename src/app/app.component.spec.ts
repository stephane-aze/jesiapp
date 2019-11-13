import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RootModule } from './root/root.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, RootModule, SharedModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('build & render', () => {
    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it(`should have as activatedPageName 'jesiapp'`, () => {
      expect(component.activatedPageName).toEqual('jesiapp');
    });
  });

  describe('onRouteActivated()', () => {
    it('should update the activatedPageName when onRouteActivated is called', () => {
      expect(component.activatedPageName).toEqual('jesiapp');
      component.onRouteActivated({ pageTitle: 'foo' });
      expect(component.activatedPageName).toEqual('foo');
    });
  });
});

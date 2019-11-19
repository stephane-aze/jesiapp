import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { EntityPreviewComponent } from '../entity-preview/entity-preview.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FavoritesComponent, EntityPreviewComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a pageTitle implemented', () => {
    expect(component.pageTitle).toBeTruthy();
    expect(component.pageTitle).toEqual('Accueil');
  });

  it('should render', () => {
    expect(element.querySelector('h1').textContent).toEqual('Welcome to the Jest powered A Song Of Ice And Fire App!');
  });
});

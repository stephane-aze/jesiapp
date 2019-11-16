import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseThumbnailComponent } from './house-thumbnail.component';

describe('HouseThumbnailComponent', () => {
  let component: HouseThumbnailComponent;
  let fixture: ComponentFixture<HouseThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

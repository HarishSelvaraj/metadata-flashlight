import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveLoaderComponent } from './drive-loader.component';

describe('DriveLoaderComponent', () => {
  let component: DriveLoaderComponent;
  let fixture: ComponentFixture<DriveLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

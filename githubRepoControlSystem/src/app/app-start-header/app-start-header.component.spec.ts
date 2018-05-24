import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStartHeaderComponent } from './app-start-header.component';

describe('AppStartHeaderComponent', () => {
  let component: AppStartHeaderComponent;
  let fixture: ComponentFixture<AppStartHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStartHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStartHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

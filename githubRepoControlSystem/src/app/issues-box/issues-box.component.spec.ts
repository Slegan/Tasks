import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesBoxComponent } from './issues-box.component';

describe('IssuesBoxComponent', () => {
  let component: IssuesBoxComponent;
  let fixture: ComponentFixture<IssuesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

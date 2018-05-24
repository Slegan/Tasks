import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoBoxComponent } from './repo-box.component';

describe('RepoBoxComponent', () => {
  let component: RepoBoxComponent;
  let fixture: ComponentFixture<RepoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

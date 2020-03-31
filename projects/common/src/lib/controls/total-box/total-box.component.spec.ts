import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBoxComponent } from './total-box.component';

describe('TotalBoxComponent', () => {
  let component: TotalBoxComponent;
  let fixture: ComponentFixture<TotalBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

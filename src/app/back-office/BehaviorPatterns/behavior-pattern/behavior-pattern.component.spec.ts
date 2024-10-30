import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorPatternComponent } from './behavior-pattern.component';

describe('BehaviorPatternComponent', () => {
  let component: BehaviorPatternComponent;
  let fixture: ComponentFixture<BehaviorPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorPatternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehaviorPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonfootprintListComponent } from './carbonfootprint-list.component';

describe('CarbonfootprintListComponent', () => {
  let component: CarbonfootprintListComponent;
  let fixture: ComponentFixture<CarbonfootprintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonfootprintListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonfootprintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

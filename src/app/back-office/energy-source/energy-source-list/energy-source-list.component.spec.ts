import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergySourceListComponent } from './energy-source-list.component';

describe('EnergySourceListComponent', () => {
  let component: EnergySourceListComponent;
  let fixture: ComponentFixture<EnergySourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergySourceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergySourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

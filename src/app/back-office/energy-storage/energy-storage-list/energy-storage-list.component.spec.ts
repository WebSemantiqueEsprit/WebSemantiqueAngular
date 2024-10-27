import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyStorageListComponent } from './energy-storage-list.component';

describe('EnergyStorageListComponent', () => {
  let component: EnergyStorageListComponent;
  let fixture: ComponentFixture<EnergyStorageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyStorageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyStorageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

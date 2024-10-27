import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsommationEnergieListComponent } from './consommation-energie-list.component';

describe('ConsommationEnergieListComponent', () => {
  let component: ConsommationEnergieListComponent;
  let fixture: ComponentFixture<ConsommationEnergieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsommationEnergieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsommationEnergieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

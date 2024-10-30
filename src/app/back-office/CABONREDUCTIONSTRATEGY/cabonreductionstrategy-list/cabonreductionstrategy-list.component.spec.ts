import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarbonReductionStrategyListComponent } from './cabonreductionstrategy-list.component';


describe('CabonreductionstrategyListComponent', () => {
  let component: CarbonReductionStrategyListComponent;
  let fixture: ComponentFixture<CarbonReductionStrategyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonReductionStrategyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonReductionStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

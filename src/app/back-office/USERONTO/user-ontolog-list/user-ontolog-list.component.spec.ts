import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOntologListComponent } from './user-ontolog-list.component';

describe('UserOntologListComponent', () => {
  let component: UserOntologListComponent;
  let fixture: ComponentFixture<UserOntologListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOntologListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOntologListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

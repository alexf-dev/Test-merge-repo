import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenteeHistoryComponent } from './absentee-history.component';

describe('AbsenteeHistoryComponent', () => {
  let component: AbsenteeHistoryComponent;
  let fixture: ComponentFixture<AbsenteeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenteeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenteeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

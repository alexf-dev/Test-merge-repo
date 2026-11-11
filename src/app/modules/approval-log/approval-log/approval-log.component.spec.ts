import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalLogComponent } from './approval-log.component';

describe('ApprovalLogComponent', () => {
  let component: ApprovalLogComponent;
  let fixture: ComponentFixture<ApprovalLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

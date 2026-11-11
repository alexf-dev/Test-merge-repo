import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCompletedExpertDealsComponent } from './export-completed-expert-deals.component';

describe('ExportCompletedExpertDealsComponent', () => {
  let component: ExportCompletedExpertDealsComponent;
  let fixture: ComponentFixture<ExportCompletedExpertDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportCompletedExpertDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportCompletedExpertDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

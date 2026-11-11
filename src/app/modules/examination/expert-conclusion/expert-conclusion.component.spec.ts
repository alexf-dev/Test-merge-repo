import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertConclusionComponent } from './expert-conclusion.component';

describe('ExpertConclusionComponent', () => {
  let component: ExpertConclusionComponent;
  let fixture: ComponentFixture<ExpertConclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertConclusionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertConclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

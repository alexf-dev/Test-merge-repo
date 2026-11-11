import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionApprovedComponent } from './resolution-approved.component';

describe('ResolutionApprovedComponent', () => {
  let component: ResolutionApprovedComponent;
  let fixture: ComponentFixture<ResolutionApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolutionApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResolutionApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

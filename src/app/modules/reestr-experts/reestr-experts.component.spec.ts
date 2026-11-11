import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestrExpertsComponent } from './reestr-experts.component';

describe('ReestrExpertsComponent', () => {
  let component: ReestrExpertsComponent;
  let fixture: ComponentFixture<ReestrExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReestrExpertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReestrExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

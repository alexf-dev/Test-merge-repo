import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestrIeExpertsComponent } from './reestr-ie-experts.component';

describe('ReestrIeExpertsComponent', () => {
  let component: ReestrIeExpertsComponent;
  let fixture: ComponentFixture<ReestrIeExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReestrIeExpertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReestrIeExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

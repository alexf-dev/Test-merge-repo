import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteringReestrExpertsComponent } from './registering-reestr-experts.component';

describe('RegisteringReestrExpertsComponent', () => {
  let component: RegisteringReestrExpertsComponent;
  let fixture: ComponentFixture<RegisteringReestrExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteringReestrExpertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteringReestrExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

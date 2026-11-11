import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeRequestFormComponent } from './committee-request-form.component';

describe('CommitteeRequestFormComponent', () => {
  let component: CommitteeRequestFormComponent;
  let fixture: ComponentFixture<CommitteeRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitteeRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommitteeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

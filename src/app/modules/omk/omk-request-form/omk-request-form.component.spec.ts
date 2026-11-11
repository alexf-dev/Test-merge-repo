import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmkRequestFormComponent } from './omk-request-form.component';

describe('OmkRequestFormComponent', () => {
  let component: OmkRequestFormComponent;
  let fixture: ComponentFixture<OmkRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmkRequestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OmkRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

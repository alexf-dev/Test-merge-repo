import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationIprComponent } from './formation-ipr.component';

describe('FormationIprComponent', () => {
  let component: FormationIprComponent;
  let fixture: ComponentFixture<FormationIprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationIprComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationIprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealReexaminationComponent } from './appeal-reexamination.component';

describe('AppealReexaminationComponent', () => {
  let component: AppealReexaminationComponent;
  let fixture: ComponentFixture<AppealReexaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealReexaminationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealReexaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

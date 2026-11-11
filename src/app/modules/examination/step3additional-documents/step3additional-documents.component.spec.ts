import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3additionalDocumentsComponent } from './step3additional-documents.component';

describe('Step3additionalDocumentsComponent', () => {
  let component: Step3additionalDocumentsComponent;
  let fixture: ComponentFixture<Step3additionalDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3additionalDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step3additionalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

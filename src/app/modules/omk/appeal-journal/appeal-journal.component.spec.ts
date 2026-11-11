import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealJournalComponent } from './appeal-journal.component';

describe('AppealJournalComponent', () => {
  let component: AppealJournalComponent;
  let fixture: ComponentFixture<AppealJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

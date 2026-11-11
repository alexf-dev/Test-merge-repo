import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MseActRegisterJournalComponent } from './mse-act-register-journal.component';

describe('MseActsRegisterPageComponent', () => {
  let component: MseActRegisterJournalComponent;
  let fixture: ComponentFixture<MseActRegisterJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MseActRegisterJournalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MseActRegisterJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

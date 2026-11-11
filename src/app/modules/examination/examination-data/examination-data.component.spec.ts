import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExaminationDataComponent} from './examination-data.component';

describe('ExaminationDataComponent', () => {
  let component: ExaminationDataComponent;
  let fixture: ComponentFixture<ExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationDataComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

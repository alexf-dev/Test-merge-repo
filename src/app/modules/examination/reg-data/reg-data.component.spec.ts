import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegDataComponent} from './reg-data.component';

describe('RegDataComponent', () => {
  let component: RegDataComponent;
  let fixture: ComponentFixture<RegDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegDataComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

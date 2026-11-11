import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseHelpComponent } from './choose-help.component';

describe('ChooseHelpComponent', () => {
  let component: ChooseHelpComponent;
  let fixture: ComponentFixture<ChooseHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

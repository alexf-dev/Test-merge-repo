import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbdflFindComponent } from './gbdfl-find.component';

describe('GbdflFindComponent', () => {
  let component: GbdflFindComponent;
  let fixture: ComponentFixture<GbdflFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GbdflFindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GbdflFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

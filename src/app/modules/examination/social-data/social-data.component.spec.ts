import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialDataComponent} from './social-data.component';

describe('SocialDataComponent', () => {
  let component: SocialDataComponent;
  let fixture: ComponentFixture<SocialDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialDataComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SocialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

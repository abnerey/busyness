import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusynessComponent } from './busyness.component';

describe('BusynessComponent', () => {
  let component: BusynessComponent;
  let fixture: ComponentFixture<BusynessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusynessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusynessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

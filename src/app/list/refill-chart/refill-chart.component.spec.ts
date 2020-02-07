import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillChartComponent } from './refill-chart.component';

describe('RefillChartComponent', () => {
  let component: RefillChartComponent;
  let fixture: ComponentFixture<RefillChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefillChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

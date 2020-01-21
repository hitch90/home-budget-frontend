import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBalanceComponent } from './category-balance.component';

describe('CategoryBalanceComponent', () => {
  let component: CategoryBalanceComponent;
  let fixture: ComponentFixture<CategoryBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

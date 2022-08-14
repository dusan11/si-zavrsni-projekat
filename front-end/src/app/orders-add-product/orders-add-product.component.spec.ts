import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAddProductComponent } from './orders-add-product.component';

describe('OrdersAddProductComponent', () => {
  let component: OrdersAddProductComponent;
  let fixture: ComponentFixture<OrdersAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersAddProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

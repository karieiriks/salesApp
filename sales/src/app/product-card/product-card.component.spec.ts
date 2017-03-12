/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ]
    })
    .compileComponents();
  }));

  const mockEmitter = {
    emit: jasmine.createSpy('emit')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: EventEmitter,
        useValue: mockEmitter
      }]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changes', () => {
    component.onEditProduct();
    expect(mockEmitter.emit).toHaveBeenCalled;
  })
});

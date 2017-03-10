/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellerCardComponent } from './seller-card.component';

describe('SellerCardComponent', () => {
  let component: SellerCardComponent;
  let fixture: ComponentFixture<SellerCardComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});

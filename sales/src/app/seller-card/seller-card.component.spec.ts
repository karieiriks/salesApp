/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SellersService, Seller, Product } from '../sellers.service';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ToastsManager, ToastOptions, ToastContainer } from 'ng2-toastr/ng2-toastr';
import { SellerCardComponent } from './seller-card.component';

describe('SellerCardComponent', () => {
  let component: SellerCardComponent;
  let fixture: ComponentFixture<SellerCardComponent>;

  const sellersServiceMock = {
    addedProduct: true,
    editedProduct: true,
    products: [{
      id: 1,
      name: 'Vara',
      quantityInStock: 10,
      quantitySold: 5,
      price: 1200,
      imgPath: 'http://www.hellyeah.com'
    }, {
      id: 2,
      name: 'NýVara',
      quantityInStock: 12,
      quantitySold: 7,
      price: 1900,
      imgPath: 'http://www.hellno.com'
    }],

    postProduct: () => {
      return {
        subscribe: (fnSuccess, fnError) => {
          if (sellersServiceMock.addedProduct === true) {
            fnSuccess(sellersServiceMock.products[0]);
          } else {
            fnError();
          }
        },
        then: (fn) => {
          fn();
        }
      };
    },
  };

  const modelInstanceMock = {
    success: true,
    product: {
      id: 1,
      name: 'Vara',
      quantityInStock: 10,
      quantitySold: 5,
      price: 1200,
      imgPath: 'http://www.hellyeah.com'
    },
    open: () => {
      return {
        result: {
          then: (fnSuccess, fnError) => {
            if (modelInstanceMock.success === true) {
              fnSuccess(modelInstanceMock.product);
            } else {
              fnError();
            }
          },
          catch: (err) => {
            return 'error';
          }
        },
        componentInstance: {
          title: 'Búa til vöru',
          sellerID: 2,
          imgPath: 'http://www.pornhub.com'
        }
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCardComponent ],
      imports: [FormsModule],
      providers: [{
        provide: SellersService,
        useValue: sellersServiceMock
      }, {
        provide: NgbModal,
        useValue: modelInstanceMock
      }, ToastsManager, ViewContainerRef, ToastOptions]
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
/*
  it('should open a modelDialog for addProduct', () => {
    const product = sellersServiceMock.products[0]
    component.products = [];
    component.addProduct();
    expect(component.products[0]).toEqual(product);
  });*/
});

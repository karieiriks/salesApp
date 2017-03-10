/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SellersService, Seller } from '../sellers.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';

import { SellersComponent } from './sellers.component';

describe('SellersComponent', () => {
  let component: SellersComponent;
  let fixture: ComponentFixture<SellersComponent>;

  class SellersServiceMock {
    seller = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    getSellers(): Observable<Seller[]> {
      return Observable.of(this.seller);
    }
    addSeller() {
      modalMock.open();
      return modalMock.componentInstance;
    }

    editSeller() {
      return modalMock.open('foo');
    }
  }

  let modalMock = {
    open: jasmine.createSpy('open'),
    componentInstance: {
      id: 1,
      name: 'Kári',
      category: 'Matur'
    },

  }

  const mockService = new SellersServiceMock();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SellersComponent ],
        imports: [ FormsModule ],
        providers: [{
          provide: SellersService,
          useValue: mockService
        }, {
          provide: NgbModal,
          useValue: modalMock
        }]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should get all sellers', async(() => {
    const seller = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    mockService.getSellers();
    expect(mockService.seller).toEqual(seller);
  }));

  it('should open a modalDialog on addSeller', () => {
    const seller = {
      id: 1,
      name: 'Kári',
      category: 'Matur',
    };
    let test = mockService.addSeller();
    expect(modalMock.open).toHaveBeenCalled();
    expect(test).toEqual(seller);
  });

  it('should open a modalDialog on editSeller', () => {
    mockService.editSeller();
    expect(modalMock.open).toHaveBeenCalled();
  })

});

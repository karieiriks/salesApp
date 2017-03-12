/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable} from 'rxjs/Observable';
import { Seller, Product } from './sellers.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


describe('SellersService', () => {
  let service: SellersService;
/*
  const mockHttp = {
    get: jasmine.createSpy('get'),
    put: jasmine.createSpy('get'),
    post: jasmine.createSpy('get')
  };

  let subject: SellersService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersService ],
       imports: [ HttpModule, FormsModule, ReactiveFormsModule ],
      providers: [{
        provide: SellersService,
        useValue: subject
      }, {
        provide: Http,
        useValue: mockHttp
      }, {
        provide: MockBackend,
        useValue: backend
      } ]})
      .compileComponents();
  });



  beforeEach(inject([SellersService, MockBackend], (userService: SellersService, mockBackend: MockBackend) => {
    subject = userService;
    backend = mockBackend;
  }));*/

 /* xit('should get all sellers from Api', () => {
    let sellers = [{
      id: 1,
      name: 'Kári',
      category: 'Matur',
    }, {
      id: 2,
      name: 'Lúlli',
      category: 'Föt',
    }];
    expect(mockHttp.getSellers()).toEqual(sellers);
  })*/



  it('should call get in getSellers', () => {
    expect(service).toBeTruthy;
  });
});

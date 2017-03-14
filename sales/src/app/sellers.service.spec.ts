/* tslint:disable:no-unused-variable */

import { SellersService } from './sellers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import { Seller, Product } from './sellers.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/rx';


describe('SellersService', () => {
  let subject: SellersService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: ([
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      SellersService])
    }).compileComponents();
  });

  beforeEach(inject([SellersService, MockBackend], (sellersService: SellersService, mockBackend: MockBackend) => {
    subject = sellersService;
    backend = mockBackend;
  }));

  it('calling getSellers', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getSellers().subscribe(response =>{
        expect(response['success']).toEqual(true);
      });
  });

  it('calling getSellerById', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getSellerById(1).subscribe(response =>{
        expect(response['success']).toEqual(true);
      });
  });

  it('calling postSeller', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });
    const obj = {
      name: 'Kári',
      category: 'Föt',
      imagePath: 'http://www.s.is'
    };

    subject
      .postSeller(obj).then(response => {
        expect(response.json()).toEqual({ success: true });
      });
  });

  it('calling putSeller', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });
    const obj = {
      name: 'Kári',
      category: 'Föt',
      imagePath: 'http://www.s.is'
    };

    subject
      .putSeller(obj).then(response => {
        expect(response.json()).toEqual({ success: true });
      });
  });

  it('calling postProduct', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });
    const obj = {
      name: 'Buxur',
      price: '100',
      quantitySold: '100',
      quantityInStock: '100',
      imagePath: 'http://www.s.is'
    };

    subject
      .postProduct(obj, 1).then(response => {
        expect(response.json()).toEqual({ success: true });
      });
  });

  it('calling getSellersProduct', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getSellersProduct(1).subscribe(response => {
        expect(response['success']).toEqual(true);
      });
  });

  it('calling putProduct', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });
    const obj = {
      id: 1,
      name: 'Buxur',
      price: '100',
      quantitySold: '100',
      quantityInStock: '100',
      imagePath: 'http://www.s.is'
    };

    subject
      .putProduct(obj, 1).then(response => {
        expect(response.json()).toEqual({ success: true });
      });
  });

 /* it('calling getSellersProduct', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    subject
      .getTopTenProducts(1).subscribe(response => {
        expect(response['success']).toEqual(true);
      });
  });*/
});

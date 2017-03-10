import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/rx';

export interface Seller {
  id: number;
  name: string;
  category: string;
  imagePath: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    quantitySold: number;
    quantityInStock: number;
    imagePath: string;
}

@Injectable()
export class SellersService {

  nextId: number;
  constructor(private http: Http) { }

  getSellers(): Observable<Seller[]> {
    console.log('Calling getSellers');
    return this.http.get('http://localhost:5000/api/sellers')
    .map(response => {
      const obj = <Seller[]> response.json();
      this.nextId = obj.length + 1;
      console.log(this.nextId);
      return obj;
    });
  }

  getSellerById(id: number): Observable<Seller> {
    return this.http.get(`http://localhost:5000/api/sellers/${id}`)
    .map(response => {
      return <Seller> response.json();
    });
  }

  postSeller(sellerInfo: any) {
    console.log('Inside service :', sellerInfo);
    console.log('Sending POST request for a new seller');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const obj = JSON.stringify(sellerInfo);
    this.http.post('http://localhost:5000/api/sellers', obj, {headers: headers}).toPromise();
  }

  putSeller(sellerUpdatedInfo: any) {
    console.log('Inside service :', sellerUpdatedInfo);
    console.log('Sending PUT request for a new seller');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const id = sellerUpdatedInfo.id;
    const obj = JSON.stringify(sellerUpdatedInfo);
    return this.http.put(`http://localhost:5000/api/sellers/${id}`, obj, {headers: headers}).toPromise();
  }

  postProduct(productInfo: any, sellerID: number) {
    console.log('Inside service postProduct() :', productInfo);
    console.log('Inside service sellerID :', sellerID);
    console.log('Sending POST request for a new product');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const obj = JSON.stringify(productInfo);
    this.http.post(`http://localhost:5000/api/sellers/${sellerID}/products`, obj, {headers: headers}).toPromise();
  }

  getSellersProduct(id: number): Observable<Product[]> {
    console.log('ID of user :', id);
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
    .map(response => {
      return <Product[]> response.json();
    });
  }

  putProduct(updatedProduct: any, sellerID: number) {
    console.log('Inside service putProduct() :', updatedProduct);
    console.log('Inside service sellerID :', sellerID);
    console.log('Sending PUT request for an existing product');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const id = updatedProduct.id;
    const obj = JSON.stringify(updatedProduct);
    return this.http.put(`http://localhost:5000/api/sellers/${sellerID}/products/${id}`, obj, {headers: headers}).toPromise();
  }

  getTopTenProducts(id: number): Observable<Product[]> {
    console.log('ID of the user : ', id)
    return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
    .map(response => {
      let temp = <Product[]> response.json();
      temp.sort((a,b) => {
        return ((b.price * b.quantitySold) - (a.price * a.quantitySold));
      });
      return temp;
    });
  }


}

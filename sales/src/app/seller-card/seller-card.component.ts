import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Seller, SellersService, Product } from '../sellers.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.component.html',
  styleUrls: ['./seller-card.component.css']
})
export class SellerCardComponent implements OnInit {

  sellerId: number;
  seller: Seller;
  products: Product[];
  topTenProducts: Product[];
  showProductsTab = true;
  showTopTenTab = false;

  constructor(private activatedRoute: ActivatedRoute,
              private sellerService: SellersService,
              private modalService: NgbModal,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef) {
                this.toastr.setRootViewContainerRef(vcr);
               }

  ngOnInit() {
    const route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.sellerId = <number> id;
    });

    this.getSeller(this.sellerId);

    this.sellerService.getSellersProduct(this.sellerId).subscribe(result => {
      this.products = result;
      console.log('All products : ', result);
      this.getTopTen();
      console.log('Top ten : ', this.topTenProducts);
    });
  }

  getSeller(id: number) {
    this.sellerService.getSellerById(this.sellerId).subscribe(result => {
      this.seller = result;
      console.log(result);
    });
    console.log(this.seller);
  }

  getTopTen() {
    this.sellerService.getTopTenProducts(this.sellerId).subscribe( result => {
      this.topTenProducts = result.slice(0, 10);
      console.log(this.topTenProducts);
    });
  }

/*
  getTopTen() {
    let temp = this.products;
    temp.sort((a,b) => {
        return ((b.price * b.quantitySold) - (a.price * a.quantitySold));
    });
    console.log(temp);
    this.topTenProducts = temp.slice(0,10);
  }
*/
  addProduct() {
    console.log('Add product');
    const modelInstance = this.modalService.open(ProductDialogComponent);

    modelInstance.componentInstance.title = 'Búa Til Nýja Vöru';
    modelInstance.componentInstance.sellerID = this.sellerId;
    modelInstance.componentInstance.name = 'Ný vara';
    modelInstance.componentInstance.price = 2000;
    modelInstance.componentInstance.quantityInStock = 0;
    modelInstance.componentInstance.quantitySold = 0;
    modelInstance.componentInstance.imagePath = 'imgPath';

    // TODO: We need to validate inputs

    console.log('sellerID: ', this.sellerId);

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
      const returnObj = this.sellerService.postProduct(obj, this.sellerId);
      this.products.push(obj);
      //this.getTopTen();
      this.toastr.success('Success!', 'Product added');
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
      this.toastr.info('Cancelled!', 'Product not added');
    });
  }

  onEditProduct(product: Product) {
    console.log('product: ', product);

    const modelInstance = this.modalService.open(ProductDialogComponent);

    modelInstance.componentInstance.title = 'Breyta Vöru';
    modelInstance.componentInstance.sellerID = this.sellerId;
    modelInstance.componentInstance.id = product.id;
    modelInstance.componentInstance.name = product.name;
    modelInstance.componentInstance.quantityInStock = product.quantityInStock;
    modelInstance.componentInstance.quantitySold = product.quantitySold;
    modelInstance.componentInstance.price = product.price;
    modelInstance.componentInstance.imagePath = product.imagePath;

    // TODO: We need to validate inputs

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
      const returnObj = this.sellerService.putProduct(obj, this.sellerId);
      console.log(returnObj);
      this.replaceEditedProduct(obj);
      //this.getTopTen();
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
      this.toastr.info('Cancelled!', 'Update cancelled');
    });
  }

  /**
   * Since there is no functionality for deleting product so 
   * they are always ordered correctly in the arrays.
   * 
   * @param updatedProduct is the updated product information
   */
  replaceEditedProduct(updatedProduct: Object) {
    this.products[updatedProduct['id'] - 1] = <Product> updatedProduct;
  }

  updateTopTen(newObj: Object) {
    this.topTenProducts.push(<Product> newObj);
    this.topTenProducts.sort((a, b) => {
      return ((b.price * b.quantitySold) - (a.price * a.quantitySold)); 
    });
  }  

  showProducts() {
    this.showProductsTab = true;
    this.showTopTenTab = false;
  }

  showTopTen() {
    this.showProductsTab = false;
    this.showTopTenTab = true;
  }
}

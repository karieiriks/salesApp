import { Component, OnInit, Input } from '@angular/core';
import { Seller, SellersService, Product } from '../sellers.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.component.html',
  styleUrls: ['./seller-card.component.css']
})
export class SellerCardComponent implements OnInit {

  sellerId: number;
  seller: Seller;
  products: Product[];

  constructor(private activatedRoute: ActivatedRoute,
              private sellerService: SellersService,
              private modalService: NgbModal) { }

  ngOnInit() {
    const route = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.sellerId = <number> id;
    });
    this.getSeller(this.sellerId);
    this.sellerService.getSellersProduct(this.sellerId).subscribe(result => {
      this.products = result;
    });
  }

  getSeller(id: number) {
    this.sellerService.getSellerById(this.sellerId).subscribe(result => {
      this.seller = result;
      console.log(result);
    });
    console.log(this.seller);
  }


  addProduct() {
    console.log('Add product');
    const modelInstance = this.modalService.open(ProductDialogComponent);
    modelInstance.componentInstance.name = 'Ný vara';
    modelInstance.componentInstance.price = 2000;
    modelInstance.componentInstance.imagePath = 'imgPath';

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
    });
  }

  onEditProduct(product: Product) {
    console.log('product: ',product);
    const modelInstance = this.modalService.open(ProductDialogComponent);
    modelInstance.componentInstance.id = product.id;
    modelInstance.componentInstance.name = product.name;
    modelInstance.componentInstance.quantityInStock = product.quantityInStock;
    modelInstance.componentInstance.quantitySold = product.quantitySold;
    modelInstance.componentInstance.price = product.price;
    modelInstance.componentInstance.imagePath = product.imagePath;

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
    });
  }
}

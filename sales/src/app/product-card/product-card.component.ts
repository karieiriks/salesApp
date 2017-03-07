import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../sellers.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input()
  product: Product;

  @Output()
  productUpdated = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditProduct() {
    console.log('this.product: ', this.product);
    this.productUpdated.emit(this.product);
  }
/*
    editSeller(s: Seller) {
    console.log(s);
    const modelInstance = this.modalService.open(SellerDialogComponent);
    modelInstance.componentInstance.id = s.id;
    modelInstance.componentInstance.sellerName = s.name;
    modelInstance.componentInstance.category = s.category;
    modelInstance.componentInstance.imgPath = s.imagePath;

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
    });
  }
}
*/
}

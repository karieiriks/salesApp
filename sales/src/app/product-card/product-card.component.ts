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

}

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

    this.getProducts();
    this.getTopTen();
    console.log('Top ten : ', this.topTenProducts);
  }

  getSeller(id: number) {
    this.sellerService.getSellerById(this.sellerId).subscribe(result => {
      this.seller = result;
      console.log(result);
    });
    console.log(this.seller);
  }

  getTopTen() {
    this.sellerService.getSellersProduct(this.sellerId).subscribe( result => {
      this.topTenProducts = result.sort((a, b) => {
        return ((b.price * b.quantitySold) - (a.price * a.quantitySold));
      }).slice(0, 10);
      console.log(this.topTenProducts);
    });
  }

  getProducts() {
      this.sellerService.getSellersProduct(this.sellerId).subscribe(result => {
        this.products = result;
        if(this.products.length === 0) {
          this.toastr.info('Engar vörur hjá þessum seljanda');
        }
      });
  }

  addProduct() {
    console.log('Add product');
    const modelInstance = this.modalService.open(ProductDialogComponent);

    modelInstance.componentInstance.title = 'Búa Til Nýja Vöru';
    modelInstance.componentInstance.sellerID = this.sellerId;
    modelInstance.componentInstance.imagePath = 'http://www.logoworks.com/blog/wp-content/themes/fearless/images/missing-image-640x360.png';

    console.log('sellerID: ', this.sellerId);

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
      this.sellerService.postProduct(obj, this.sellerId).then(response => {
        this.getTopTen();
        this.getProducts();
        this.toastr.success('Vöru bætt við');
      });
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
      this.toastr.info('Hætt við!', 'Engri vöru bætt við');
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

    modelInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
      this.sellerService.putProduct(obj, this.sellerId).then(response => {
        console.log(response);
        this.getTopTen();
        this.getProducts();
        this.toastr.success('Vara uppfærð');
      });
    }).catch(err => {
      console.log('When pressed Cancel');
      console.log(err);
      this.toastr.info('Hætt við breytingar');
    });
  }

  showProducts() {
    this.showProductsTab = true;
    this.showTopTenTab = false;
    if (this.products.length === 0) {
      this.toastr.info('Engar vörur hjá þessum seljanda');
    }
  }

  showTopTen() {
    this.showProductsTab = false;
    this.showTopTenTab = true;
    if (this.topTenProducts.length === 0) {
      this.toastr.info('Engar vörur hjá þessum seljanda');
    }
  }
}

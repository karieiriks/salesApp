import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from './sellers.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Söluaðilar';

  sellers: Seller[];
  seller: Seller;

  constructor(private modalService: NgbModal, 
              private service: SellersService){}

  ngOnInit() {
    var successHandler = (result) => {
      this.seller = result;
    };
    var errorHandler = (err) => {
      // TODO display toastr!
      console.log('Something failed');
    };
    this.getSellers();
    /*,(err) => {
      // TODO display toastr!
      console.log('Something failed');
    }*/
    /*this.service.getSellers().subscribe(successHandler, errorHandler);*/
    /*this.service.getSellerById(2).subscribe(result => {
      this.seller = result;
    });*/
  }

  getSellers() {
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
  }

  addSeller() {
    console.log('addSeller() clicked');
    const modalInstance = this.modalService.open(SellerDialogComponent);
    modalInstance.componentInstance.sellerName = 'Lúlli';
    modalInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
    });
  }

  editSeller(s: Seller) {
    
  }
}

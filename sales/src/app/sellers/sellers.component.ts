import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SellersService, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  sellers: Seller[];
  seller: Seller;

  constructor(private modalService: NgbModal,
              private service: SellersService,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef) {
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.getSellers();
  }

  getSellers() {
    this.service.getSellers().subscribe(result => {
      this.sellers = result;
    });
  }

  addSeller() {
    console.log('addSeller() clicked');
    const modalInstance = this.modalService.open(SellerDialogComponent);
    modalInstance.componentInstance.title = 'Nýr Notandi';

    modalInstance.componentInstance.model.id = 0;

    modalInstance.result.then(obj => {
      console.log(this.sellers);
      if (obj !== null) {
        this.sellers.push(obj);
        this.service.postSeller(obj);
      }
      console.log('When pressed OK');
      console.log('Dialog object :', obj);
      this.toastr.success('Nýjum seljanda bætt við');
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
      this.toastr.info('Hætt við!')
    });
  }

  editSeller(s: Seller) {
    console.log(s);
    const modalInstance = this.modalService.open(SellerDialogComponent);

    modalInstance.componentInstance.title = 'Breyta Notenda';    
    modalInstance.componentInstance.model.id = s.id;
    modalInstance.componentInstance.model.sellerName = s.name;
    modalInstance.componentInstance.model.category = s.category;
    modalInstance.componentInstance.model.imgPath = s.imagePath;

    modalInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
      this.service.putSeller(obj);
      this.replaceEditedSeller(obj);
      this.toastr.success('Seljandi uppfærður', 'Tókst!');
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
      this.toastr.info('Hætt við!', '');
    });
  }

  replaceEditedSeller(updatedSeller: Object) {
    this.sellers[updatedSeller['id'] - 1] = <Seller> updatedSeller;
  }
}

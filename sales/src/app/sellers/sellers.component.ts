import { Component, OnInit } from '@angular/core';
import { SellersService, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDialogComponent } from '../seller-dialog/seller-dialog.component';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  sellers: Seller[];
  seller: Seller;

  constructor(private modalService: NgbModal,
              private service: SellersService) {}

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
    
    modalInstance.result.then(obj => {
      console.log(this.sellers);
      if (obj !== null) {
        console.log('NOT NULL');
        /*const tmpObj = {
          id: this.sellers[-1].id + 1,
          name: obj.name,
          category: obj.category,
          imagePath: obj.imagePath
        }*/
        console.log(this.sellers[-1]);
        this.sellers.push(obj);
        //console.log(this.sellers[-1]);// = this.sellers[-2].id + 1;
      }
      console.log('When pressed OK');
      console.log('Dialog object :', obj);
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
    });
  }

  editSeller(s: Seller) {
    console.log(s);
    const modalInstance = this.modalService.open(SellerDialogComponent);
    modalInstance.componentInstance.title = 'Breyta Notenda';    
    modalInstance.componentInstance.id = s.id;
    modalInstance.componentInstance.sellerName = s.name;
    modalInstance.componentInstance.category = s.category;
    modalInstance.componentInstance.imgPath = s.imagePath;

    modalInstance.result.then(obj => {
      console.log('When pressed OK');
      console.log(obj);
    }).catch(err => {
      console.log('When presses Cancel');
      console.log(err);
    });
  }
}

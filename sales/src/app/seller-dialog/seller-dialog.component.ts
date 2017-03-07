import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.css']
})
export class SellerDialogComponent implements OnInit {

  sellerName: string;
  category: string;
  imgPath: string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSave() {
    /*
    let newID = sellers.length + 1;
    
    this.activeModal.close({
      id: newID,
      name: this.sellerName,
      category: this.category,
      imgPath: this.imgPath
    });
    */
    
  }

  onCancel() {
    this.activeModal.dismiss();
  } 

}

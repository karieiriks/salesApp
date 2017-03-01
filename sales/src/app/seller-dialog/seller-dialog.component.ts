import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.css']
})
export class SellerDialogComponent implements OnInit {

  sellerName: string;

  constructor() { }

  ngOnInit() {
  }

}

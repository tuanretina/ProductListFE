import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { IProduct } from 'src/app/shared/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public service: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
    this.service.takeTotalRecord();

  }

  populateForm(product: Product) {
    this.service.formData = Object.assign({}, product);
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteProduct(id)
        .subscribe(res => {
          this.service.refreshList();
          this.service.takeTotalRecord();
          this.toastr.warning('Deleted successfully', 'Product List');
        },
          err => {
            console.log(err);
          })
    }
  }

  Search() {
    if (this.service.keyword == "") {
      this.ngOnInit();
    }
    else {
      this.service.refreshList();
      this.service.takeTotalRecord();
    }
  }
}



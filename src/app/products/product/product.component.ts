import { Product } from 'src/app/shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../shared/product.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  constructor(public service: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.listCategory();
    this.service.listSupplier();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: 0,
      name: '',
      description: '',
      releaseDate: '',
      discontinuedDate: '',
      rating: '',
      price: '',
      categoryID: 0,
      category: '',
      supplierID: 0,
      supplier: '',
      details: ''
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postProduct().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Create product successfully', 'Product Create');
        this.service.refreshList();
        this.service.takeTotalRecord();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putProduct().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Update product successfully', 'Product Update');
        this.service.refreshList();
        this.service.takeTotalRecord();


      },
      err => {
        console.log(err);
      }
    )
  }

}

import { ISupplier } from './ISupplier';
import { IProduct } from 'src/app/shared/product';
import { Page } from './page';
import { Res } from './res';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ICategory } from './ICategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData!: Product;
  products: Product[] = [];
  categories!: ICategory[];
  suppliers: ISupplier[] = [];
  keyword: string = '';
  p: number = 1;
  totalRecords: string = '';
  readonly rootUrl = 'https://localhost:5001/api';
  constructor(private http: HttpClient) { }

  postProduct() {
    return this.http.post(this.rootUrl + '/Products', this.formData);
  }

  putProduct() {
    return this.http.put(this.rootUrl + '/Products/' + this.formData.id, this.formData);
  }

  deleteProduct(id) {
    return this.http.delete(this.rootUrl + '/Products/' + id);
  }


  refreshList() {
    this.getProductList().toPromise().then(res => {
      this.products = res.resultObj.items
    });
  }

  listCategory() {
    this.getCategory().toPromise().then(res => {
      this.categories = res.resultObj.items
      console.log(this.categories)
    });
  }

  listSupplier() {
    this.getSupplier().toPromise().then(res => {
      this.suppliers = res.resultObj.items
      console.log(this.suppliers)

    });
  }

  takeTotalRecord() {
    this.getTotalRecord().toPromise().then(res => {
      this.totalRecords = res.resultObj.totalRecord
    });
  }

  getProductList(): Observable<Res<Page<Product[]>>> {
    return this.http.get<Res<Page<Product[]>>>(this.rootUrl + '/Products/paging?PageIndex=1&PageSize=1000&Keyword=' + this.keyword);
  }

  getTotalRecord(): Observable<Res<Page<IProduct[]>>> {
    return this.http.get<Res<Page<IProduct[]>>>(this.rootUrl + '/Products/paging?PageIndex=1&PageSize=1000&Keyword=' + this.keyword);
  }

  getCategory(): Observable<Res<Page<ICategory[]>>> {
    return this.http.get<Res<Page<ICategory[]>>>(this.rootUrl + '/Categories');
    console.log(this.categories)

  }

  getSupplier(): Observable<Res<Page<ISupplier[]>>> {
    return this.http.get<Res<Page<ISupplier[]>>>(this.rootUrl + '/Supplier');

  }




}




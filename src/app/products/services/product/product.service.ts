import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../../models/product';
import { ReplaySubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$ = new ReplaySubject<Product[]>();

  constructor(private http: HttpClient) { }

  getProducts() {
    this.http.get(`${environment.url_api}/bp/products`)
      .pipe(
        map((data: any) => {
          for (const key in data) {
            const element = data[key];
            const date_release = element.date_release.split('T')[0];
            const date_revision = element.date_revision.split('T')[0];
            data[key].date_release = date_release;
            data[key].date_revision = date_revision;
          }
          
          return data;
        })
      )
      .subscribe((res: any) => {
        this.products$.next(res);
      });
  }

  verifyProduct(id: string) {
    const params = new HttpParams()
    .set('id', id)

    return this.http.get<boolean>(`${environment.url_api}/bp/products/verification`, {params})
  }

  addProduct(product: Product) {
    return this.http.post(`${environment.url_api}/bp/products`, product);
  }

  modifyProduct(product: Product) {
    return this.http.put(`${environment.url_api}/bp/products`, product);
  }

  deleteProduct(id: string) {
    const params = new HttpParams()
    .set('id', id)

    return this.http.delete(`${environment.url_api}/bp/products`, {params})
  }
}

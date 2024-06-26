import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Product } from '../../models/product';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$ = new ReplaySubject<Product[]>();

  constructor(private http: HttpClient) { }

  /**
   * Get products
   */
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

  /**
   * Verify if product exist
   * @param {string} id 
   * @returns {Observable<boolean>} Response true: exist | false: no exist
   */
  verifyProduct(id: string) {
    const params = new HttpParams()
    .set('id', id)

    return this.http.get<boolean>(`${environment.url_api}/bp/products/verification`, {params})
  }

  /**
   * Add new product
   * @param {Product} product 
   * @returns {(Observable<Product> | HttpErrorResponse)} Response with the data product added or error message
   */
  addProduct(product: Product) {
    return this.http.post(`${environment.url_api}/bp/products`, product);
  }

  /**
   * Modify data of the product
   * @param {Product} product 
   * @returns {(Observable<Product> | HttpErrorResponse)} Response with the data product edited or error message
   */
  modifyProduct(product: Product) {
    return this.http.put(`${environment.url_api}/bp/products`, product);
  }

  /**
   * Delete a product
   * @param {string} id 
   * @returns {(Observable<string> | HttpErrorResponse)} Response success or error message
   */
  deleteProduct(id: string) {
    const params = new HttpParams()
    .set('id', id)

    return this.http.delete(`${environment.url_api}/bp/products`, {params})
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsUrl = `${environment.apiUrl}products/`;

  constructor(private http: HttpClient) {}

  createProduct(ProductData: any): Observable<any> {
    return this.http.post<any>(`${this.productsUrl}`, {
      name: ProductData.name,
      code: ProductData.code,
      sale_value: ProductData.price,
      handles_vat: ProductData.hasIva,
      vat_percentage: ProductData.ivaPercentage,
    });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }
}

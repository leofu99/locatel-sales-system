import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  salesUrl = `${environment.apiUrl}sales/`;

  constructor(private http: HttpClient) {}

  createSale(saleData: any): Observable<any> {
    const saledetails = saleData.details.map((detail: any) => ({
      product: detail.product,
      subtotal: detail.subTotal,
      unit_price: detail.productPrice,
      quantity: detail.quantity,
    }));
    return this.http.post<any>(this.salesUrl, {
      total_sale: saleData.totalSale,
      invoice_number: saleData.invoiceNumber,
      customer: saleData.customer,
      details: saledetails,
    });
  }

  getSales(): Observable<any[]> {
    return this.http.get<any[]>(this.salesUrl);
  }
}

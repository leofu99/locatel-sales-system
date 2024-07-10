import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  customersUrl = `${environment.apiUrl}customers/`;

  constructor(private http: HttpClient) {}

  createcustomer(CustomerData: any): Observable<any> {
    return this.http.post<any>(`${this.customersUrl}`, {
      id_number: CustomerData.idCard,
      name: CustomerData.name,
      address: CustomerData.address,
      phone: CustomerData.phone,
      email: CustomerData.email,
    });
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.customersUrl);
  }
}

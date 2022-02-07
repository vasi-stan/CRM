import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Sale } from '../common/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private baseUrl = 'http://192.168.1.131:8080/api/sales';
  private customUrl = 'http://192.168.1.131:8080/api/getAllSales';
  sale: Sale;

  constructor(private httpClient: HttpClient) { }

  getSaleList(): Observable<any> {
    return this.httpClient.get(this.customUrl);
  }

  postSale(sale: Sale, client_id: number, contact_id: number): Observable<unknown> {
    if(client_id == null) {
      client_id = 0;
    }
    if(contact_id == null) {
      contact_id = 0;
    }
    const url = `${this.baseUrl}/${client_id}/${contact_id}`;
    console.log(sale);
    return this.httpClient.post(url, sale);
  }

  deleteSale(id: number): Observable<unknown> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  updateSale(sale: Sale, client_id: number, contact_id: number): Observable<unknown> {
    if(client_id == null) {
      client_id = 0;
    }
    if(contact_id == null) {
      contact_id = 0;
    }
    const url = `${this.baseUrl}/${sale.id}/${client_id}/${contact_id}`;
    console.log(sale);
    return this.httpClient.put<Sale>(url, sale);
  }

}


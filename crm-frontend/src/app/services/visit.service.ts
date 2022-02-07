import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visit } from '../common/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private baseUrl = 'http://192.168.1.131:8080/api/visits';
  private customUrl = 'http://192.168.1.131:8080/api/getAllVisits';
  visit: Visit;

  constructor(private httpClient: HttpClient) {
   }

  getVisitList(): Observable<any> {
    return this.httpClient.get(this.customUrl);
  }

  postVisit(visit: Visit, client_id: number, contact_id: number): Observable<unknown> {
    if(client_id == null) {
      client_id = 0;
    }
    if(contact_id == null) {
      contact_id = 0;
    }
    const url = `${this.baseUrl}/${client_id}/${contact_id}`;
    return this.httpClient.post(url, visit);
  }

  deleteVisit(id: number): Observable<unknown> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  updateVisit(visit: Visit, client_id: number, contact_id: number): Observable<unknown> {
    if(client_id == null) {
      client_id = 0;
    }
    if(contact_id == null) {
      contact_id = 0;
    }
    const url = `${this.baseUrl}/${visit.id}/${client_id}/${contact_id}`;
    return this.httpClient.put(url, visit);
  }

}


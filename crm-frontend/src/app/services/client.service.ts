import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../common/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://192.168.1.131:8080/api/clients';
  client: Client;
  clients: Client[];

  constructor(private httpClient: HttpClient) { }

  getClientList(): Observable<Client[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.clients)
    );
  }

  postClient(client: Client): Observable<unknown> {
    return this.httpClient.post(this.baseUrl, client);
  }

  deleteClient(id: number): Observable<unknown> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  updateClient(client: Client): Observable<unknown> {
    const url = `${this.baseUrl}/${client.id}`;
    return this.httpClient.put(url, client);
  }
}

interface GetResponse {
  _embedded: {
    clients: Client[];
  }
}

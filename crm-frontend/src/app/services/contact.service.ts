import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../common/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://192.168.1.131:8080/api/contacts';
  contact: Contact;
  contacts: Contact[];

  constructor(private httpClient: HttpClient) { }

  getContactList(): Observable<Contact[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.contacts)
    );
  }

  postContact(contact: Contact): Observable<unknown> {
    return this.httpClient.post(this.baseUrl, contact);
  }

  deleteContact(id: number): Observable<unknown> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  updateContact(contact: Contact): Observable<unknown> {
    const url = `${this.baseUrl}/${contact.id}`;
    return this.httpClient.put(url, contact);
  }
}

interface GetResponse {
  _embedded: {
    contacts: Contact[];
  }
}

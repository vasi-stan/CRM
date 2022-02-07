import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/common/client';
import { Contact } from 'src/app/common/contact';
import { Visit } from 'src/app/common/visit';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { VisitService } from 'src/app/services/visit.service';
import { ConfirmationdeleteComponent } from '../../dialog/confirmationdelete/confirmationdelete.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  list: boolean = true;
  nou: boolean = false;
  titlu: string = "";
  visit: Visit;
  visits: Visit[];
  clients: Client[];
  contacts: Contact[];
  count: number;

  tempVisits: MatTableDataSource<Visit>;

  displayedColumns: string[] = ['data', 'client', 'contact', 'tip_activitate', 'note', 'promotionale', 'recontactare', 'actions'];

  constructor(private visitService: VisitService,
              private clientService: ClientService,
              private contactService: ContactService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.listVisits();
    this.listContacts();
    this.listClients();
  }

  listVisits() {
    this.visitService.getVisitList().subscribe(
      data => {
        this.visits = data.reverse();
        this.count = this.visits.length;
        this.tempVisits = new MatTableDataSource<Visit>(this.visits)}
    );
  }

  listContacts() {
    this.contactService.getContactList().subscribe(
      data => {
        this.contactService.contacts = data.reverse();
        this.contacts = this.contactService.contacts.sort((a, b) => a.nume_contact < b.nume_contact ? -1 : a.nume_contact > b.nume_contact ? 1 : 0);
      }
    )
  }

  listClients() {
    this.clientService.getClientList().subscribe(
      data => {
        this.clientService.clients = data.reverse();
        this.clients = this.clientService.clients.sort((a, b) => a.nume_client < b.nume_client ? -1 : a.nume_client > b.nume_client ? 1 : 0);
      }
    )
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmationdeleteComponent, { data: {nume: "vizita", intreb: "vizita"}});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === "true") {
          this.visitService.deleteVisit(id).subscribe(
            data => {
              this.listVisits();
            }
          );
        }
      }
    );
  }

  editareVisit(visit: Visit) {
    this.visit = visit;
    this.list = false;
    this.nou = false;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tempVisits.filter = filterValue.trim().toLowerCase();
  }

  salvare() {
    let client_id = this.visit.client_id;
    let contact_id = this.visit.contact_id;
    this.visit.nume_client = null;
    this.visit.nume_contact = null;
    this.visit.client_id = null;
    this.visit.contact_id = null;
    if (this.nou == false){
      this.visitService.updateVisit(this.visit, client_id, contact_id).subscribe(data => {
        this.listVisits();
      });      
    }else{
      this.visit.id = this.count + 1;
      this.visitService.postVisit(this.visit, client_id, contact_id).subscribe(data => {
        this.listVisits();
      });
    }
    this.list = true;
  }

  cancel() {
    this.list = true;
  }

  newVisit() {
    this.visit = new Visit();
    this.titlu = "Vizita noua"
    this.list = false;
    this.nou = true;
  }

}

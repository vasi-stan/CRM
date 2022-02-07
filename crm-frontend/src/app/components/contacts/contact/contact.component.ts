import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contact } from 'src/app/common/contact';
import { ContactService } from 'src/app/services/contact.service';
import { ConfirmationdeleteComponent } from '../../dialog/confirmationdelete/confirmationdelete.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  list: boolean = true;
  nou: boolean = false;
  titlu: string = "";
  contact: Contact;
  gen = [
    {value: 'barbat', viewValue: 'barbat'},
    {value: 'femeie', viewValue: 'femeie'},
  ];
  tempContacts: MatTableDataSource<Contact>;

  displayedColumns: string[] = ['nume', 'functie', 'gen', 'telefon', 'telefon2', 'email', 'email2', 'note', 'actions'];

  constructor(private contactService: ContactService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.listContacts();
  }

  listContacts() {
    this.contactService.getContactList().subscribe(
      data => {
        this.contactService.contacts = data.reverse();
        this.tempContacts = new MatTableDataSource<Contact>(this.contactService.contacts);
      }
    )
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmationdeleteComponent, { data: {nume: "contact", intreb: "contactul"}});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === "true") {
          this.contactService.deleteContact(id).subscribe(
            data => {
              this.listContacts();
            }
          );
        }
      }
    );
  }

  editareContact(contact: Contact) {
    this.contact = contact;
    this.list = false;
    this.nou = false;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tempContacts.filter = filterValue.trim().toLowerCase();
  }

  salvare() {
    if (this.nou == false){
      this.contactService.updateContact(this.contact).subscribe(data => {
        this.listContacts();
      });
    }else{
      this.contactService.postContact(this.contact).subscribe(data => {
        this.listContacts();
      });;
    }
    this.list = true;
  }

  cancel() {
    this.list = true;
  }

  newContact() {
    this.contact = new Contact();
    this.titlu = "Contact nou"
    this.list = false;
    this.nou = true;
  }

}

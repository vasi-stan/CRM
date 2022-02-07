import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/common/client';
import { ClientService } from 'src/app/services/client.service';
import { ConfirmationdeleteComponent } from '../../dialog/confirmationdelete/confirmationdelete.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  list: boolean = true;
  nou: boolean = false;
  titlu: string = "";
  client: Client;
  gen = [
    {value: 'barbat', viewValue: 'barbat'},
    {value: 'femeie', viewValue: 'femeie'},
  ];
  tempClients: MatTableDataSource<Client>;

  displayedColumns: string[] = ['nume', 'localitate', 'judet', 'note', 'industrie', 'modalitate_plata', 'note_plata', 'actions'];

  constructor(private clientService: ClientService,
    private dialog: MatDialog,
    private router: Router) { }

    ngOnInit(): void {
      this.listClients();
    }

  listClients() {
    this.clientService.getClientList().subscribe(
      data => {
        this.clientService.clients = data.reverse();
        this.tempClients = new MatTableDataSource<Client>(this.clientService.clients);
      }
    )
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmationdeleteComponent, { data: {nume: "client", intreb: "clientul"}});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === "true") {
          this.clientService.deleteClient(id).subscribe(
            data => {
              this.listClients();
            }
          );
        }
      }
    );
  }

  editareClient(client: Client) {
    this.client = client;
    this.list = false;
    this.nou = false;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tempClients.filter = filterValue.trim().toLowerCase();
  }

  salvare() {
    if (this.nou == false){
      this.clientService.updateClient(this.client).subscribe(data => {
        this.listClients();
      });
    }else{
      this.clientService.postClient(this.client).subscribe(data => {
        this.listClients();
      });;
    }
    this.list = true;
  }

  cancel() {
    this.list = true;
  }

  newClient() {
    this.client = new Client();
    this.titlu = "Contact nou"
    this.list = false;
    this.nou = true;
  }

}
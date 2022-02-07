import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/common/client';
import { Contact } from 'src/app/common/contact';
import { Sale } from 'src/app/common/sale';
import { ClientService } from 'src/app/services/client.service';
import { ContactService } from 'src/app/services/contact.service';
import { SaleService } from 'src/app/services/sale.service';
import { ConfirmationdeleteComponent } from '../../dialog/confirmationdelete/confirmationdelete.component';



@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  edit: number;
  count: number;
  sale: Sale;
  sales: Sale[] = [];
  yearSales: Sale[];
  monthSales: Sale[];
  clients: Client[];
  contacts: Contact[];
  cadran: string = "list";
  nou: boolean = true;
  titlu: string = "";
  tempSales: MatTableDataSource<Sale>;
  displayedColumns: string[] = ['actions', 'data', 'client', 'contact', 'produse', 'valoare_fara_tva',
    'valoare_cu_tva', 'procent_comision', 'data_livrare', 'data_plata',
    'luna_comision', 'platit', 'zile_plata', 'tichete', 'note'];
  yearsSale: any;
  monthsSale: any;
  items: any[];
  lunaComision: any[];
  monthsSaleTemp: any[];

  numarComenzi: number;
  valoareFaraTva: number;
  valoareCuTva: number;
  tichete: number;
  comision: number;
  comisionIncasate: number;
  comisionNeincasate: number;
  lunaraComision: boolean = false;
  comisionTotal: number;

  constructor(private saleService: SaleService,
    private clientService: ClientService,
    private contactService: ContactService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.listSales();   
    this.listClients();
    this.listContacts();
    
  }

  listSales() {
    
    this.saleService.getSaleList().subscribe(
      data => {
        this.sales = data.reverse();
        this.tempSales = new MatTableDataSource<Sale>(this.sales);
        this.calculMenuDataSale();  
        this.calculMenuLunaComision();     
      }
    )
  }

  calculMenuDataSale() {
    this.items = new Array();
        this.yearsSale = new Set();
        if(this.sales != null){
          this.count = this.sales.length;     
          this.edit = this.sales[0].id;
        }
        
        //console.log('in listSales' + this.edit);
        for (const x of this.sales) {
          this.yearsSale.add(x.data_sale.toString().split('-')[0]);
        }
        for (const x of this.yearsSale){
          this.monthsSale = new Set();
          this.monthsSaleTemp = new Array();
          for (const y of this.sales) {
            if (x == y.data_sale.toString().split('-')[0]){
              this.monthsSale.add(y.data_sale.toString().split('-')[1]);
            }
          }
          this.monthsSale.forEach((element: any) => {
            this.monthsSaleTemp.push(element);
          });
          this.monthsSaleTemp.sort();
          this.items.push({an: x, luni: this.monthsSaleTemp});
        }
  }

  calculMenuLunaComision() {
    this.lunaComision = new Array();
        this.yearsSale = new Set();
        if(this.sales != null){
          this.count = this.sales.length;     
          this.edit = this.sales[0].id;
        }
        
        //console.log('in listSales' + this.edit);
        for (const x of this.sales) {
          this.yearsSale.add(x.luna_comision.toString().split('-')[0]);
        }
        for (const x of this.yearsSale){
          this.monthsSale = new Set();
          this.monthsSaleTemp = new Array();
          for (const y of this.sales) {
            if (x == y.luna_comision.toString().split('-')[0]){
              this.monthsSale.add(y.luna_comision.toString().split('-')[1]);
            }
          }
          this.monthsSale.forEach((element: any) => {
            this.monthsSaleTemp.push(element);
          });
          this.monthsSaleTemp.sort();
          this.lunaComision.push({an: x, luni: this.monthsSaleTemp});
        }
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

  liste() {
    this.listSales();
    this.cadran = "list";
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(ConfirmationdeleteComponent, { data: { nume: "vanzare", intreb: "vanzarea" } });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === "true") {
          this.saleService.deleteSale(id).subscribe(
            data => {
              this.listSales();
            }
          );
        }
      }
    );
  }

  editareSale(sale: Sale) {
    this.sale = sale;
    this.cadran = "edit";
    this.titlu = "Modificare vanzare";
    this.nou = false;

  }

  newSale() {
    this.sale = new Sale();
    this.titlu = "Vanzare noua"
    this.cadran = "edit";
    this.nou = true;
  }

  salvare() {
    let client_id = this.sale.client_id;
    let contact_id = this.sale.contact_id;
    this.sale.nume_client = null;
    this.sale.nume_contact = null;
    this.sale.client_id = null;
    this.sale.contact_id = null;
    console.log(this.sale);
    if (this.nou == false) {
      this.saleService.updateSale(this.sale, client_id, contact_id).subscribe(data => {
        this.listSales();
      });
    } else {
      this.sale.id = this.count + 1;
      this.saleService.postSale(this.sale, client_id, contact_id).subscribe(data => {
        this.listSales();
      });
    }
    this.cadran = "list";
  }

  rapoarte() {
    this.cadran = "rapoarte";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tempSales.filter = filterValue.trim().toLowerCase();
  }

  cancel() {
    this.cadran = "list";
  }

  anual(an: any) {
    let sale = this.sales.filter(sale => sale.data_sale.toString().split('-')[0] == an);
    this.tempSales = new MatTableDataSource<Sale>(sale);
    this.numarComenzi = 0;
    this.valoareFaraTva = 0;
    this.valoareCuTva = 0;
    this.tichete = 0;
    this.comision = 0;
    sale.forEach(sale => {
      this.numarComenzi += 1;
      this.valoareFaraTva += sale.valoare_fara_tva;
      this.valoareCuTva += sale.valoare_cu_tva;
      this.tichete += sale.tichete;
      this.comision += sale.procent_comision * sale.valoare_fara_tva;
    })
    this.cadran = "anual";
  }

  lunar(an: any, luni: any) { 
    this.lunaraComision = false;  
    let sale = this.sales.filter(sale => sale.data_sale.toString().split('-')[0] == an);
    let saleT = sale.filter(sale => sale.data_sale.toString().split('-')[1] == luni);
    this.tempSales = new MatTableDataSource<Sale>(saleT);
    this.numarComenzi = 0;
    this.valoareFaraTva = 0;
    this.valoareCuTva = 0;
    this.tichete = 0;
    this.comision = 0;
    saleT.forEach(sale => {
      this.numarComenzi += 1;
      this.valoareFaraTva += sale.valoare_fara_tva;
      this.valoareCuTva += sale.valoare_cu_tva;
      this.tichete += sale.tichete;
      this.comision += sale.procent_comision * sale.valoare_fara_tva;
    })
    this.cadran = "lunar";
  }

  lunarComision(an: any, luni: any) {
    this.lunaraComision = true;
    let sale = this.sales.filter(sale => sale.luna_comision.toString().split('-')[0] == an);
    let saleT = sale.filter(sale => sale.luna_comision.toString().split('-')[1] == luni);
    this.tempSales = new MatTableDataSource<Sale>(saleT);
    this.numarComenzi = 0;
    this.valoareFaraTva = 0;
    this.valoareCuTva = 0;
    this.tichete = 0;
    this.comision = 0;
    this.comisionIncasate = 0;
    this.comisionNeincasate = 0;
    this.comisionTotal = 0;
    saleT.forEach(sale => {
      this.numarComenzi += 1;
      this.valoareFaraTva += sale.valoare_fara_tva;
      this.valoareCuTva += sale.valoare_cu_tva;
      this.tichete += sale.tichete;
      this.comision += sale.procent_comision * sale.valoare_fara_tva;
      if(sale.platit){
        this.comisionIncasate += sale.procent_comision * sale.valoare_fara_tva;
      }else{
        this.comisionNeincasate += sale.procent_comision * sale.valoare_fara_tva;
      }
      
    })
    this.comisionTotal = this.tichete + this.comisionIncasate + this.comisionNeincasate;
    this.cadran = "lunar";
  }

  saptamanal() {
    let data = new Date();
    console.log(data.getTimezoneOffset());
    data.setDate(data.getDate()-data.getDay());
    
    let saleZ = this.sales.filter(sale => new Date(sale.data_sale) > new Date(data));

    this.tempSales = new MatTableDataSource<Sale>(saleZ);
    this.numarComenzi = 0;
    this.valoareFaraTva = 0;
    this.valoareCuTva = 0;
    this.tichete = 0;
    this.comision = 0;
    saleZ.forEach(sale => {
      this.numarComenzi += 1;
      this.valoareFaraTva += sale.valoare_fara_tva;
      this.valoareCuTva += sale.valoare_cu_tva;
      this.tichete += sale.tichete;
      this.comision += sale.procent_comision * sale.valoare_fara_tva;
    })
    this.cadran = "saptamanal";
  }

}

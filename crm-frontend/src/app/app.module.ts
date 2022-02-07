import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ClientService } from './services/client.service';
import { ContactService } from './services/contact.service';
import { VisitService } from './services/visit.service';
import { SaleService } from './services/sale.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationdeleteComponent } from './components/dialog/confirmationdelete/confirmationdelete.component';
import { ClientComponent } from './components/clients/client/client.component';
import { ContactComponent } from './components/contacts/contact/contact.component';
import { SaleComponent } from './components/sales/sale/sale.component';
import { VisitComponent } from './components/visits/visit/visit.component';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    ConfirmationdeleteComponent,
    ClientComponent,
    ContactComponent,
    SaleComponent,
    VisitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    ClientService,
    ContactService,
    VisitService,
    SaleService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

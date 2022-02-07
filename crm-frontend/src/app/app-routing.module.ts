import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/clients/client/client.component';
import { ContactComponent } from './components/contacts/contact/contact.component';
import { SaleComponent } from './components/sales/sale/sale.component';
import { VisitComponent } from './components/visits/visit/visit.component';


const routes: Routes = [
  {path: 'contacts', component: ContactComponent},
  {path: 'clients', component: ClientComponent},
  { path: 'visits', component: VisitComponent },
  { path: 'sales', component: SaleComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: '**', redirectTo: 'clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  ScrollingModule,
  MatRadioModule,
  MatMenuModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

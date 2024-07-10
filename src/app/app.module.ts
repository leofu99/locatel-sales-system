// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { SalesListComponent } from './components/sales-list/sales-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { SaleFormComponent } from './components/sale-form/sale-form.component';
import { SaleDetailsComponent } from './components/sale-details/sale-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientFormComponent,
    ProductFormComponent,

    SalesListComponent,
    SaleFormComponent,
    SaleDetailsComponent,
  ],
  imports: [
    MatListModule,
    MatSelectModule,
    MatOptionModule,

    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,

    MatSidenavModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

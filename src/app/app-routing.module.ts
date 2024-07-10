// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

import { SalesListComponent } from './components/sales-list/sales-list.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component';

const routes: Routes = [
  { path: 'client-form', component: ClientFormComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'sale-form', component: SaleFormComponent },
  { path: 'sales-list', component: SalesListComponent },
  { path: '', redirectTo: '/client-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

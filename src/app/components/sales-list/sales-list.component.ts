// sales-list.component.ts

import { Component, OnInit } from '@angular/core';

import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
})
export class SalesListComponent implements OnInit {
  sales: any[] = [];
  selectedSale: any | null = null;

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales().subscribe((sales) => {
      this.sales = sales;
    });
  }

  toggleDetailsPanel(sale: any) {
    this.selectedSale = sale;
    const panel = document.querySelector('.details-panel');
    if (panel) {
      panel.classList.add('show');
    }
  }

  closeDetailsPanel() {
    this.selectedSale = null;
    const panel = document.querySelector('.details-panel');
    if (panel) {
      panel.classList.remove('show');
    }
  }
}

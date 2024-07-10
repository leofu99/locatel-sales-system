// sale-details.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss'],
})
export class SaleDetailsComponent {
  @Input() selectedSale: any | null = null;
  @Output() closeDetails = new EventEmitter<void>();

  constructor() {}

  onClose() {
    this.closeDetails.emit();
  }
}

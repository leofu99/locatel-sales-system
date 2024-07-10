import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';
import { MessageService } from 'src/app/services/message.service';
import { MessageFormatterService } from 'src/app/services/message-formatter.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
})
export class SaleFormComponent implements OnInit {
  saleForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private messageService: MessageService,
    private messageFormatter: MessageFormatterService,
    private customerService: ClientService,
    private productService: ProductService
  ) {
    this.saleForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      customer: [null, Validators.required],
      details: this.fb.array([]),
      totalSale: [{ value: 0, disabled: true }],
    });
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
  }

  get details(): FormArray {
    return this.saleForm.get('details') as FormArray;
  }

  addDetail() {
    const detailFormGroup = this.fb.group({
      product: [null, Validators.required],
      productPrice: [{ value: 0, disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      iva: [{ value: 0, disabled: true }],
      subTotal: [{ value: 0, disabled: true }],
    });

    detailFormGroup.get('product')!.valueChanges.subscribe((productId) => {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        // Convertir los valores a números si es necesario
        const productPrice = parseFloat(product.sale_value);
        const ivaPercentage = parseFloat(product.vat_percentage);

        detailFormGroup.get('productPrice')!.setValue(productPrice);

        const iva = product.handles_vat
          ? productPrice * (ivaPercentage / 100)
          : 0;
        detailFormGroup.get('iva')!.setValue(iva);

        this.updateSubTotal(detailFormGroup);
      }
    });

    detailFormGroup.get('quantity')!.valueChanges.subscribe(() => {
      this.updateSubTotal(detailFormGroup);
    });

    this.details.push(detailFormGroup);
    this.updateTotalSale();
  }

  removeDetail(index: number) {
    this.details.removeAt(index);
    this.updateTotalSale();
  }

  updateSubTotal(detailFormGroup: FormGroup) {
    const productPrice = detailFormGroup.get('productPrice')!.value || 0;
    const quantity = detailFormGroup.get('quantity')!.value || 0;
    const iva = detailFormGroup.get('iva')!.value || 0;
    const subTotal = productPrice * quantity + iva;
    detailFormGroup.get('subTotal')!.setValue(subTotal);
    this.updateTotalSale();
  }

  updateTotalSale() {
    let total = 0;
    this.details.controls.forEach((detail) => {
      total += detail.get('subTotal')!.value || 0;
    });
    this.saleForm.get('totalSale')!.setValue(total);
  }

  onSubmit() {
    if (this.saleForm.valid) {
      this.loading = true;

      this.saleService.createSale(this.saleForm.getRawValue()).subscribe(
        (response) => {
          console.log('Venta registrada exitosamente:', response);
          this.messageService.showSuccess('Venta registrada exitosamente');
          this.loading = false;
          this.saleForm.reset();
          this.details.clear();
        },
        (error) => {
          console.error('Error al registrar la venta:', error);

          this.messageService.showError(
            this.messageFormatter.serverError(error.error)
          );
          this.loading = false;
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      // Convertir los valores a números si es necesario
      products.forEach((product) => {
        product.sale_value = parseFloat(product.sale_value);
        product.vat_percentage = parseFloat(product.vat_percentage);
      });
      this.products = products;
    });
  }
}

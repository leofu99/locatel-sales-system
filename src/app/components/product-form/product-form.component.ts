import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'src/app/services/message.service';
import { MessageFormatterService } from 'src/app/services/message-formatter.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private messageFormatter: MessageFormatterService
  ) {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      hasIva: [false, Validators.required],
      ivaPercentage: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });

    this.productForm.get('hasIva')!.valueChanges.subscribe((value) => {
      const ivaControl = this.productForm.get('ivaPercentage');
      if (value) {
        ivaControl!.enable();
      } else {
        ivaControl!.disable();
        ivaControl!.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.loading = true;

      this.productService.createProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Producto creado exitosamente:', response);
          this.messageService.showSuccess('Producto creado exitosamente');
          this.loading = false;
          this.productForm.reset();
        },
        (error) => {
          console.error('Error al crear producto:', error);

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
}

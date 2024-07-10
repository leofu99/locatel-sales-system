import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { MessageFormatterService } from 'src/app/services/message-formatter.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private messageService: MessageService,
    private messageFormatter: MessageFormatterService
  ) {
    this.clientForm = this.fb.group({
      idCard: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.loading = true;
      this.clientService.createcustomer(this.clientForm.value).subscribe(
        (result) => {
          console.log(result);
          this.messageService.showSuccess('Cliente creado exitosamente');
        },
        (error) => {
          console.error('Error al crear cliente:', error);
          this.messageService.showError(
            this.messageFormatter.serverError(error.error)
          );
          this.loading = false;
        }
      );
      this.loading = false;
      this.clientForm.reset();
    } else {
      this.loading = false;
      console.error('El formulario no es válido.');
    }
  }
}

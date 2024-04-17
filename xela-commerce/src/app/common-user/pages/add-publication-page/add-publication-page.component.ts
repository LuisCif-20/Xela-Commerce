import { Component, inject } from '@angular/core';
import { PublicationService } from '../../../shared/services/publication.service';
import { Router } from '@angular/router';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'common-add-publication-page',
  templateUrl: './add-publication-page.component.html',
  styles: ``
})
export class AddPublicationPageComponent {

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private pubsService = inject(PublicationService);
  private formData: FormData|null = null;

  public disabled: boolean = true;

  receiveData(data: FormData|null) {
    this.formData = data;
    if (this.formData) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  onAddPublication() {
    if (!this.disabled && this.formData) {
      this.pubsService.addPublication(this.formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/common/my-publications')
          showSuccess(this.snackBar, 'Publicacion creada correctamente.');
        },
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/common/my-publications');
  }

}

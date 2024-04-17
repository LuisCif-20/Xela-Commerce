import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PublicationService } from '../../../shared/services/publication.service';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { showError, showSuccess } from '../../../shared/utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PubForm } from '../../interfaces/pub-form.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-publication-page',
  templateUrl: './edit-publication-page.component.html',
  styles: ``
})
export class EditPublicationPageComponent implements OnInit {

  private readonly imgUrl = `${environment.IMAGES_URL}/publications`

  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private actRoute = inject(ActivatedRoute);
  private pubsService = inject(PublicationService);

  private formData: FormData | null = null;
  private pubId?: number;

  public disabled: boolean = true;
  public values?: PubForm;


  ngOnInit(): void {
    this.actRoute.data.subscribe(({ publication }) => {
      this.values = {
        title: publication.title,
        price:  publication.price || '',
        picture: `${this.imgUrl}/${publication.image}`,
        category_id: publication.category.id,
        description: publication.description,
      };
      this.pubId = publication.id;
    });
  }

  receiveData(formData: FormData | null) {
    this.formData = formData;
    if (this.formData) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  onEditPublication() {
    if (!this.disabled && this.formData) {
      this.pubsService.editPublication(this.pubId!, this.formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/common/my-publications')
          showSuccess(this.snackBar, 'Publicacion editada correctamente.');
        },
        error: (err) => showError(this.snackBar, err)
      });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/common/my-publications');
  }

}

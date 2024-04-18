import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataReport } from '../../interfaces/report.interface';
import { showError, showSuccess } from '../../utilities/showSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicationService } from '../../services/publication.service';

interface DataIds {
  pub_id:   number;
  user_id:  number;
}

@Component({
  selector: 'app-report-publication',
  templateUrl: './report-publication.component.html',
  styleUrl: './report-publication.component.css'
})
export class ReportPublicationComponent {

  private formB = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private pubService = inject(PublicationService);

  public form: FormGroup = this.formB.group({
    reason: ['', [
      Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(255)
    ]]
  });

  constructor(
    public dialogRef: MatDialogRef<ReportPublicationComponent>,
    @Inject(MAT_DIALOG_DATA) private ids: DataIds
  ) { }

  onCancel() {
    this.dialogRef.close();
  }

  onReport() {
    const dataReport: DataReport = {
      reason: this.form.get('reason')!.value,
      user_id: this.ids.user_id
    }
    this.pubService.reportPublication(dataReport, this.ids.pub_id).subscribe({
      next: () => {
        showSuccess(this.snackBar, 'Publicacion reportada.');
        this.onCancel();
      },
      error: (err) => showError(this.snackBar, err)
    });
  }
}

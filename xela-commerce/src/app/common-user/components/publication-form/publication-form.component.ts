import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

interface CategoryOption {
  title:  string;
  icon:   string;
  value:  number;
}

@Component({
  selector: 'common-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrl: './publication-form.component.css'
})
export class PublicationFormComponent implements OnInit, OnDestroy {

  @Input() public publication?: Publication;
  @Input({ required: true }) public title!: string;
  @Input({ required: true }) public category!: boolean;
  @Output() public validForm = new EventEmitter<FormData | null>();

  private formBuilder = inject(FormBuilder);
  private formSub?: Subscription;

  public file?: File;
  public picture?: string;
  public categories: CategoryOption[] = [
    {
      title: 'Venta',
      icon: 'sell',
      value:  2
    },
    {
      title: 'Compra',
      icon: 'shop_two',
      value: 1
    },
    {
      title: 'Voluntariado',
      icon: 'handshake',
      value: 3
    }
  ];
  public pubForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    image: [null, [Validators.required]],
    category_id: [{value: '', disabled: this.category}, [Validators.required]],
    price: ['', [Validators.min(0), Validators.pattern('[0-9]*')]]
  });

  ngOnInit(): void {
    if (this.publication) {
      const newValues = {
        title: this.publication.title,
        description: this.publication.description,
        category_id: {
          value: this.publication.category.id,
          disabled: this.category
        },
        price: parseInt(this.publication.price?.toString() || '0')
      };
      this.picture = `${environment.IMAGES_URL}/publications/${this.publication.image}`;
      this.pubForm.reset(newValues);
      this.pubForm.get('image')?.setValidators(null);
    }
    this.formSub = this.pubForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.validForm.emit(this.onSubmit());
      } else {
        this.validForm.emit(null)
      }
    });
  }

  ngOnDestroy(): void {
      this.formSub?.unsubscribe();
  }

  catchFile(event: Event): void {
    this.file = (event.target as HTMLInputElement).files![0];
    const url = URL.createObjectURL(this.file);
    this.picture = url;
  }

  onSubmit(): FormData {
    const formData: FormData = new FormData();
    const data = this.pubForm.value;
    if (this.file) {
      formData.append('image', this.file);
    }
    Object.keys(data).forEach((key) => {
      if (key !== 'image') {
        if (key !== 'price') {
          formData.append(key, data[key]);
        } else {
          if (data[key] !== 0) {
            formData.append(key, data[key]);
          }
        }
      }
    })
    return formData;
  }

}

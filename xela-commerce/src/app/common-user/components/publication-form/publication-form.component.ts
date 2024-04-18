import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publication } from '../../../shared/interfaces/publication.interface';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Subscription, filter, switchMap, take, takeWhile, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PubForm } from '../../interfaces/pub-form.interface';

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

  @Input() public currentValues?: PubForm;
  @Output() public values = new EventEmitter<FormData|null>();

  private formBuilder = inject(FormBuilder);

  private catSub?: Subscription;
  private formSub?: Subscription;

  public file?: File;
  public picture?: string;
  public title: string = 'Crea';
  public categories: CategoryOption[] = [
    {
      title: 'Compra',
      icon: 'shop_two',
      value: 1
    },
    {
      title: 'Venta',
      icon: 'sell',
      value:  2
    },
    {
      title: 'Voluntariado',
      icon: 'handshake',
      value: 3
    }
  ];
  public pubForm: FormGroup = this.formBuilder.group({
    image:        [null],
    price:        ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
    title:        ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    description:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    category_id:  ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.currentValues) {
      this.title = 'Edita';
      const { picture, ...resData } = this.currentValues;
      this.picture = picture;
      this.pubForm.reset(resData);
      this.pubForm.get('category_id')!.disable();
    } else {
      this.pubForm.get('image')!.setValidators(Validators.required);
    }
    this.catSub = this.pubForm.get('category_id')!.valueChanges
      .subscribe((value) => {
        if (value === 3) {
          this.pubForm.get('price')!.disable();
        } else {
          this.pubForm.get('price')!.enable();
        }
      }
    );
    this.formSub = this.pubForm.statusChanges
      .subscribe((status) => {
        if (status === 'VALID') {
          this.values.emit(this.returnData());
        } else {
          this.values.emit(null);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.catSub?.unsubscribe();
    this.formSub?.unsubscribe();
  }

  catchFile(event: Event): void {
    const fileList: FileList|null = (event.target as HTMLInputElement).files;
    if (fileList) {
      this.file = fileList[0];
      if (this.file) {
        this.picture = URL.createObjectURL(this.file);
        this.pubForm.patchValue({ image: this.file });
      }
    }
  }

  returnData() {
    const formData: FormData = new FormData();
    const {image, ...data} = this.pubForm.value;
    if (this.file) formData.append('image', this.file);
    Object.keys(data).forEach((key) => {
      if (key !== 'price') {
        if (data[key]) formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }

}

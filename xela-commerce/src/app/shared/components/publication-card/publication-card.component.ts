import { Component, Input, OnInit } from '@angular/core';
import { Publication } from '../../interfaces/publication.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'shared-publication-card',
  templateUrl: './publication-card.component.html',
  styles: `
    .picture {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .state {
      top:  10px;
      right:  10px;
    }
  `
})
export class PublicationCardComponent implements OnInit {
  
  @Input({ required: true }) public publication!: Publication;

  private readonly imgUrl: string = environment.IMAGES_URL;

  ngOnInit(): void {

  }

  returnPD(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

  returnAvatar(avatar: string) {
    return `${this.imgUrl}/profile-pictures/${avatar}`;
  }

  returnImg(image: string) {
    return `${this.imgUrl}/publications/${image}`;
  }

  returnIC(state: string) {
    if (state === 'pending') {
      return 'primary';
    } else if (state === 'approved') {
      return 'accent';
    } else {
      return 'warn';
    }
  }

  returnIS(state: string) {
    if (state === 'pending') {
      return 'pending';
    } else if (state === 'approved') {
      return 'check_circle';
    } else {
      return 'report';
    }
  }

}

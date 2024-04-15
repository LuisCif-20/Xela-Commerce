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

  private readonly imgUrl: string = `${environment.IMAGES_URL}`;

  public postDate?: string;
  public avatar?: string; 
  public img?: string;
  public iconColor?: string;
  public iconState?: string;

  ngOnInit(): void {
    this.postDate = new Date(this.publication.updated_at!).toISOString().split('T')[0];
    this.avatar = `${this.imgUrl}/profile-pictures/${this.publication.user.profile_picture}`;
    this.img = `${this.imgUrl}/publications/${this.publication.image}`;
    this.returnIconState(this.publication.state);
  }

  private returnIconState(state: string) {
    switch (state) {
      case 'pending':
        this.iconColor = 'primary';
        this.iconState = 'pending';
        break;
      case 'approved':
        this.iconColor = 'accent';
        this.iconState = 'check_circle';
        break;
      default:
        this.iconColor = 'warn';
        this.iconState = 'report';
        break;
    }
  }

}

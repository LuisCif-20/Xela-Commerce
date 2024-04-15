import { Component } from '@angular/core';

@Component({
  templateUrl: './auth-layout.component.html',
  styles: `
    .bg-image {
      background-image: url('../../../../assets/auth-background.png');
      height: 100vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    @media (max-width: 550px) {
      .hidden-button {
        display: none !important;
      }
    }
  `
})
export class AuthLayoutComponent {

}

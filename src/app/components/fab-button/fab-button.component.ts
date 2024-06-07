import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  template: `
    <button *ngIf="src" class="fab" [attr.data-icon]="dataIcon" [title]="title" [attr.aria-label]="ariaLabel">
      <img aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" [src]="src"/>
    </button>
  `,
  styles: [
    `
      @import 'settings/variables';

      :host {
        position: fixed;
        bottom: 22px;
        left: calc(50% - 24px);
        z-index: 2;
      }

      .fab {
        width: 48px;
        aspect-ratio: 1;
        cursor: pointer;
        border-width: 0px;
        border-radius: 50%;
        background: $primary;
        box-shadow: 0px 6px 20px 0px $primary;

        > img {
          filter: invert(100%) sepia(96%) saturate(15%) hue-rotate(212deg) brightness(104%) contrast(104%);
        }
      }

      @media screen and (min-width: 768px) {
        :host {
          position: fixed;
          right: 64px;
          bottom: 64px;
          left: auto;
        }

        .fab {
          width: 72px;
          aspect-ratio: 1;
        }
      }
    `,
  ],
})
export class AppFabButtonComponent {
  @Input() src!: string;
  @Input() title?: string;
  @Input() ariaLabel?: string;
  @Input() dataIcon?: string
}

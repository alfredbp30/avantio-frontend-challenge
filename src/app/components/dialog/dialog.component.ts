import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <dialog class="dialog" [open]="open">
      <div class="dialog__backdrop" (click)="open = false"></div>
      <div class="dialog__content">
        <ng-content></ng-content>
      </div>
    </dialog>
  `,
  styles: [
    `
      @import 'settings/variables';

      :host {
        position: absolute;
      }

      .dialog {
        background: transparent;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        padding: 0;
        &__backdrop {
          display: none;
        }
        &__content {
          height: 100%;
          padding: 32px;
          border-radius: 0;
          background: white;
          position: fixed;
          right: 0;
          left: 0;
          bottom: 0;
          animation: overlay-animation-mobile .4s;
        }

        @media screen and (min-width: 768px) {
          &__backdrop {
            display: block;
            height: 100vh;
            width: 100vw;
            background: rgba(0, 0, 0);
            opacity: 0.3;
          }
          &__content {
            border-radius: 40px 0 0 0;
            width: 490px;
            right: 0;
            top: 0;
            bottom: auto;
            left: auto;
            animation: overlay-animation .4s;
          }
        }
      }

      @keyframes overlay-animation-mobile {
        from { bottom: -400px; }
        to { bottom: 0px; }
      }

      @keyframes overlay-animation {
        from { right: -490px; }
        to { right: 0px; }
      }
    `,
  ],
})
export class AppDialogComponent {
  @Input() open = false;
}
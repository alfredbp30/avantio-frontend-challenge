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

      .dialog {
        background: transparent;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        padding: 0;
        &__backdrop {
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0);
          opacity: 0.3;
        }
        &__content {
          padding: 32px;
          height: 100%;
          border-radius: 40px 0 0 0;
          background: white;
          position: fixed;
          width: 490px;
          right: 0;
          top: 0;
          animation: dialog-animation .4s;
        }
      }

      @keyframes dialog-animation {
        from { right: -490px; }
        to { right: 0px; }
      }
    `,
  ],
})
export class AppDialogComponent {
  @Input() open = false;
}
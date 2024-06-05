import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [AppProgressBarComponent],
  imports: [CommonModule],
  exports: [AppProgressBarComponent],
})
export class AppProgressBarModule {}

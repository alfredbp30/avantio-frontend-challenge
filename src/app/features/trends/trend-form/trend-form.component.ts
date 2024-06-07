import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trend-form',
  template: `

    <ng-template #actions>
      <div class="trend-form__actions">
        <a type="submit" class="app-button app-button--primary">
          <button type="submit">Guardar</button>
        </a>
        <a class="app-button app-button--secondary">Cancelar</a>
      </div>
    </ng-template>
    <form class="trend-form__fields" [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <div class="trend-form__header">
        <h4>{{ newTrend ? 'Nueva' : 'Edita la'}} noticia</h4>
        <div class="trend-form__header-actions">
          <ng-container *ngTemplateOutlet="actions"></ng-container>
        </div>
      </div>

      <div class="trend-form__content">
        <div class="app-form-field">
          <label for="url-input">URL</label>
          <input formControlName="url" type="text" id="url-input" name="url-input" placeholder="https://www.elpais.com/..." aria-label="URL" />
        </div>
        <div class="app-form-field">
          <label for="author-input">Autor</label>
          <select formControlName="provider" id="author-input" name="author-input" placeholder="Selecciona">
            <option value="elpais">El País</option>
            <option value="elmundo">El Mundo</option>
          </select>
        </div>
        <div class="app-form-field">
          <label for="title-input">Título</label>
          <input formControlName="title" type="text" id="title-input" name="title-input" placeholder="Manuel Rodríguez" aria-label="Titulo" />
        </div>
        <div class="app-form-field">
          <label for="image-input">URL Imagen</label>
          <input formControlName="image" type="text" id="image-input" name="image-input" placeholder="https://www.elpais.com/..." aria-label="URL Imagen" />
        </div>
        <div class="app-form-field">
          <label for="content-input">Contenido</label>
          <textarea formControlName="body" type="text" id="content-input" name="content-input" placeholder="Escribe aquí" aria-label="Contenido" rows="8"></textarea>
        </div>
        <div class="trend-form__footer">
          <ng-container *ngTemplateOutlet="actions"></ng-container>
        </div>
      </div>



    </form>
  `,
  styleUrls: ['./trend-form.component.scss'],
})
export class TrendFormComponent implements OnInit {
  protected trend$ = this.store.select(selectSelectedTrend);

  @Input() newTrend = true;
  @Output() onCancel = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      url: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.newTrend) return;
    this.trend$.subscribe(trend => this.formGroup.patchValue({
      url: trend?.url,
      provider: trend?.provider,
      title: trend?.title,
      body: trend?.body?.join('\n\n'),
      image: trend?.image
    }));
  }

  onSubmit() {
    console.log('onsubmit');
  }

}


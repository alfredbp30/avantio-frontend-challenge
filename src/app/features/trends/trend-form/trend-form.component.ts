import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';

@Component({
  selector: 'app-trend-form',
  template: `

    <ng-template #actions>
      <div class="trend-form__actions">
        <a class="app-button app-button--primary">Guardar</a>
        <a class="app-button app-button--secondary">Cancelar</a>
      </div>
    </ng-template>

    <div class="trend-form__header">
      <h4>{{ newTrend ? 'Nueva' : 'Edita la'}} noticia</h4>
      <ng-container *ngTemplateOutlet="actions"></ng-container>
    </div>

    <form class="trend-form__fields">
      <div class="app-form-field">
        <label for="url-input">URL</label>
        <input type="text" id="url-input" name="url-input" placeholder="https://www.elpais.com/..." aria-label="URL" />
      </div>
      <div class="app-form-field">
        <label for="author-input">Autor</label>
        <input type="text" id="author-input" name="author-input" placeholder="Manuel Gómez" aria-label="Autor" />
      </div>
      <div class="app-form-field">
        <label for="title-input">Título</label>
        <input type="text" id="title-input" name="title-input" placeholder="Manuel Rodríguez" aria-label="Titulo" />
      </div>
      <div class="app-form-field">
        <label for="content-input">Contenido</label>
        <textarea type="text" id="content-input" name="content-input" placeholder="Escribe aquí" aria-label="Contenido" rows="8"></textarea>
      </div>
    </form>
  `,
  styleUrls: ['./trend-form.component.scss'],
})
export class TrendFormComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  @Input() newTrend = true;

  constructor(private store: Store) {}
}


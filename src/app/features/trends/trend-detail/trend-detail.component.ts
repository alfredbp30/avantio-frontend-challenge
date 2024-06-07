import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';
import { deleteTrend } from '../store/actions/trends.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button" class="trend__action" (click)="editDialog.open = true">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action" (click)="deleteDialog.open = true">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
      <app-dialog #editDialog>
        <app-trend-form [newTrend]="false" (onAction)="editDialog.open = false"></app-trend-form>
      </app-dialog>
      <app-dialog #deleteDialog class="trend__delete-dialog">
        <p>¿Estás seguro que quieres eliminar la noticia?</p>
        <div>
          <a class="app-button app-button--primary" (click)="deleteDialog.open = false; onDelete(trend)">Eliminar</a>
          <a class="app-button app-button--secondary" (click)="deleteDialog.open = false">Cancelar</a>
        </div>
      </app-dialog>
    </article>

  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  constructor(private store: Store, private router: Router) {}

  onDelete(trend: Trend) {
    this.store.dispatch(deleteTrend({id: trend.id}));
    this.trend$.subscribe(trend => {
      if (!trend) this.router.navigate(['/trends']);
    });
  }
}

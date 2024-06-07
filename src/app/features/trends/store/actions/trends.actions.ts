import { createAction, props } from '@ngrx/store';
import { Trend } from '../../models/trend.model';

export const loadTrends = createAction('[Trends List Page] Enter');

export const addTrend = createAction(
  '[Trend action] Add Trend',
  props<{ trend: Trend }>()
);

export const deleteTrend = createAction(
  '[Trend action] Delete Trend',
  props<{ id: string }>()
);

export const updateTrend = createAction(
  '[Update trend] Update Trend',
  props<{ id: string, trend: Partial<Trend> }>()
);

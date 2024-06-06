import { createAction } from '@ngrx/store';

export const loadTrends = createAction('[Trends List Page] Enter');

export const addTrend = createAction('[Trend action] Add Trend');

export const deleteTrend = createAction('[Trend action] Delete Trend');

export const updateTrend = createAction('[Update trend] Update Trend');
